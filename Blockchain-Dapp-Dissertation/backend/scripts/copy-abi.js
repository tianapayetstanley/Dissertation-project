const fs = require("fs");
const path = require("path");

const CONTRACT_NAME = "AidBoxTracker";

// source: where Hardhat outputs compiled contracts
const sourcePath = path.join(__dirname, "..", "artifacts", "contracts", `${CONTRACT_NAME}.sol`, `${CONTRACT_NAME}.json`);

// destination: frontend contract ABI folder
const destPath = path.join(__dirname, "..", "frontend", "src", "contracts", `${CONTRACT_NAME}.json`);

fs.copyFileSync(sourcePath, destPath);

console.log(`✅ Copied ABI to frontend: ${destPath}`);
