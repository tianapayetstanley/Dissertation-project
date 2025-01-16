require("@nomicfoundation/hardhat-toolbox"); // Includes common plugins like ethers.js and testing tools

module.exports = {
  solidity: "0.8.18", // Specify the Solidity version you're using
  networks: {
    hardhat: {}, // Default network provided by Hardhat for local testing
    ganache: { // Configuration for connecting to Ganache
      url: "http://127.0.0.1:8545", // Replace with your Ganache RPC server URL
      accounts: [
        // Hardhat automatically fetches accounts; Ganache private keys go here if needed
        "de62eaa250e33b5650f2cc655c764a5f0760402f7bb4d930d6cd89ae54f8069a", // Add private keys for accounts if required
      ],
    },
  },
  paths: {
    sources: "./contracts", // Where your Solidity contracts are stored
    artifacts: "./artifacts", // Where compiled contract files will be saved
    cache: "./cache", // Cache location for Hardhat
  },
};
