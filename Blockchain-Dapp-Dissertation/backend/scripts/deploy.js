const hre = require("hardhat");

async function main() {
  // Compile and get contract factory
  const AidBoxTracker = await hre.ethers.getContractFactory("AidBoxTracker");

  // Deploy contract (returns a contract instance)
  const contract = await AidBoxTracker.deploy();

  // Wait for deployment to complete
  await contract.waitForDeployment();

  // Log deployed address
  console.log("AidBoxTracker deployed to:", await contract.getAddress());

  // Add a test aid box for development use
  const tx = await contract.addAidBox("Test Box", "Pending");
  await tx.wait(); // Ensure it's mined

  console.log("📦 Seeded Box 0 with status: Pending");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
