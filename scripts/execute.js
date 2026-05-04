require("dotenv").config();
const { ethers } = require("ethers");
const { execSync } = require("child_process");

async function main() {

  console.log("Running AI Predictor...\n");

  // 🔥 Run Python predictor (IMPORTANT: full path)
  const output = execSync(
    '"C:\\Users\\thecm\\AppData\\Local\\Programs\\Python\\Python310\\python.exe backend/predictor.py"'
  ).toString();

  console.log("AI Output:\n", output);

  // 🔥 Decision check
  if (output.includes("SEND")) {

    console.log("✅ Gas optimal → Sending transaction...\n");

    // connect to network
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // 🔥 YOUR CONTRACT ADDRESS HERE
    const contractAddress = "PASTE_YOUR_DEPLOYED_ADDRESS";

    const abi = [
      "function addNumbers(uint256 n) public"
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // 🔥 send transaction
    const tx = await contract.addNumbers(10);

    console.log("Transaction Hash:", tx.hash);

    await tx.wait();

    console.log("🎉 Transaction Confirmed!");

  } else {

    console.log("⛔ Gas high → Transaction skipped");

  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});