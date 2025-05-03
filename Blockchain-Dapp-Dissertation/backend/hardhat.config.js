require("dotenv").config(); // Load .env variables
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
  networks: {
    // Local Hardhat network (default)
    hardhat: {},

    // Ganache for local development (optional)
   /*  ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "de62eaa250e33b5650f2cc655c764a5f0760402f7bb4d930d6cd89ae54f8069a"
      ]
    }, */

    // ✅ Sepolia testnet (from Infura)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",   // Contract source code
    artifacts: "./artifacts", // Compiled ABI and bytecode
    cache: "./cache"          // Internal cache (safe to ignore)
  }
};
