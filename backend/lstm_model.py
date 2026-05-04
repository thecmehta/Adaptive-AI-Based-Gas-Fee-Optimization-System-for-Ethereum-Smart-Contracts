import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler

# load data
data = pd.read_csv("backend/gas_data.csv", header=None)
data.columns = ["time", "base", "priority", "max"]

# 🔥 STEP 2: remove duplicates
data = data.drop_duplicates()

# 🔥 STEP 3: use all features
values = data[["base", "priority", "max"]].values

# normalize
scaler = MinMaxScaler()
scaled = scaler.fit_transform(values)

# 🔥 STEP 4: longer sequence (5 timesteps)
X, y = [], []
for i in range(5, len(scaled)):
    X.append(scaled[i-5:i])   # last 5 timesteps
    y.append(scaled[i][2])    # predict "max" gas

X, y = np.array(X), np.array(y)

# model
model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(5,3)))
model.add(Dense(1))

model.compile(optimizer='adam', loss='mse')

# train
model.fit(X, y, epochs=20, verbose=1)

# predict
last_seq = scaled[-5:].reshape((1,5,3))
pred_scaled = model.predict(last_seq)

# inverse transform (only max column)
dummy = np.zeros((1,3))
dummy[0][2] = pred_scaled[0][0]

prediction = scaler.inverse_transform(dummy)

print("LSTM Prediction:", prediction[0][2])