import random

Q = {"SEND": 0, "WAIT": 0}

def choose_action():
    return random.choice(["SEND", "WAIT"])

def update(action, reward):
    Q[action] += reward

def simulate():
    current_gas = random.uniform(0.5, 1.5)

    action = choose_action()

    if action == "SEND":
        reward = -current_gas
    else:
        reward = 0.2  # reward for waiting

    update(action, reward)

    print("Action:", action)
    print("Reward:", reward)
    print("Q-values:", Q)

simulate()