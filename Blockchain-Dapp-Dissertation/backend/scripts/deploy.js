const hre = require("hardhat");

async function main() {
  const AidBoxTracker = await hre.ethers.getContractFactory("AidBoxTracker");
  const contract = await AidBoxTracker.deploy();

  await contract.waitForDeployment(); // <-- replaces deployed()

  console.log(`✅ AidBoxTracker deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
