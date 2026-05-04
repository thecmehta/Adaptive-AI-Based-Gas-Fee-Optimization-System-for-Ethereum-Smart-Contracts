import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("backend/gas_data.csv", header=None)
data.columns = ["time", "base", "priority", "max"]

plt.plot(data["max"], label="Actual Gas")
plt.legend()
plt.title("Gas Trend")
plt.show()