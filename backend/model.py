import pandas as pd
from sklearn.linear_model import LinearRegression

# load data
data = pd.read_csv("backend/gas_data.csv", header=None)
data.columns = ["time", "base", "priority", "max"]

# create lag feature (time-series)
data["prev_max"] = data["max"].shift(1)
data = data.dropna()

# features
X = data[["prev_max", "base", "priority"]]
y = data["max"]

# train model
model = LinearRegression()
model.fit(X, y)

# predict next value
last_row = data.iloc[-1]
input_data = [[last_row["max"], last_row["base"], last_row["priority"]]]

prediction = model.predict(input_data)

print("Predicted Next Gas:", prediction[0])