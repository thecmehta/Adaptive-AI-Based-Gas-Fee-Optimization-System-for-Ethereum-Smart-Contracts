import subprocess

# run LSTM model
output = subprocess.check_output(
    '"C:\\Users\\thecm\\AppData\\Local\\Programs\\Python\\Python310\\python.exe backend/lstm_model.py"',
    shell=True
).decode()

# extract prediction
predicted = float(output.split(":")[1])

print("Predicted Gas:", predicted)

# decision logic
if predicted < 1.0:
    print("SEND")
else:
    print("WAIT")