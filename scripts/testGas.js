const hre = require("hardhat");

async function main() {
  const Inefficient = await hre.ethers.getContractFactory("GasInefficient");
  const inefficient = await Inefficient.deploy();
  await inefficient.waitForDeployment();

  const Optimized = await hre.ethers.getContractFactory("GasOptimized");
  const optimized = await Optimized.deploy();
  await optimized.waitForDeployment();

  let tx1 = await inefficient.addNumbers(50);
  let receipt1 = await tx1.wait();

  let tx2 = await optimized.addNumbers(50);
  let receipt2 = await tx2.wait();

  console.log("Gas Inefficient:", receipt1.gasUsed.toString());
  console.log("Gas Optimized:", receipt2.gasUsed.toString());
}

main();