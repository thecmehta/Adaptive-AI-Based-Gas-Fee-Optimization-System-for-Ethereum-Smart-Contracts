import requests
import csv
import time
import os

# 🔥 Always save in correct backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "gas_data.csv")

url = "https://api.blocknative.com/gasprices/blockprices"

# 🔥 Create file with header if not exists
if not os.path.exists(file_path):
    with open(file_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["time", "base", "priority", "max"])

print("Starting data collection... Press Ctrl+C to stop\n")

try:
    while True:
        try:
            response = requests.get(url)
            data = response.json()

            block = data["blockPrices"][0]
            estimate = block["estimatedPrices"][0]

            base = block["baseFeePerGas"]
            priority = estimate["maxPriorityFeePerGas"]
            max_fee = estimate["maxFeePerGas"]

            timestamp = time.time()

            # 🔥 Write to CSV
            with open(file_path, "a", newline="") as f:
                writer = csv.writer(f)
                writer.writerow([timestamp, base, priority, max_fee])

            print(f"Saved → Base: {base}, Priority: {priority}, Max: {max_fee}")

        except Exception as e:
            print("Error fetching data:", e)

        # 🔥 Wait 5 seconds
        time.sleep(5)

except KeyboardInterrupt:
    print("\nStopped data collection.")