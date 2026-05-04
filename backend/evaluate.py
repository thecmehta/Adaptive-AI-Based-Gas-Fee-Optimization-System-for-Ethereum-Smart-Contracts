import pandas as pd
from sklearn.metrics import mean_absolute_error

data = pd.read_csv("backend/gas_data.csv", header=None)
data.columns = ["time", "base", "priority", "max"]

data["prev_max"] = data["max"].shift(1)
data = data.dropna()

X = data[["prev_max", "base", "priority"]]
y = data["max"]

from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)

predictions = model.predict(X)

mae = mean_absolute_error(y, predictions)

print("MAE (error):", mae)