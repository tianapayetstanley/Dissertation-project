import { ethers } from "ethers";
import AidBoxTracker from '../contracts/AidBoxTracker.json'; //  ABI JSON file inside frontend/src/contracts

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

//  Ensures MetaMask is using the Hardhat local network before any tx
export async function switchToHardhatNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x7A69' }] // 31337 in hex
    });
    console.log("✅ Switched to Hardhat network");
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x7A69',
            chainName: 'Hardhat Localhost',
            rpcUrls: ['http://127.0.0.1:8545'],
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            }
          }]
        });
        console.log("✅ Hardhat network added");
      } catch (addError) {
        console.error("❌ Failed to add Hardhat network", addError);
      }
    } else {
      console.error("❌ Failed to switch to Hardhat network", switchError);
    }
  }
}

// 🔌 Connects MetaMask wallet
export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return true;
    } catch (err) {
      console.error("❌ Connection to MetaMask rejected", err);
      return false;
    }
  } else {
    alert("🦊 MetaMask not found");
    return false;
  }
}

//  Returns the contract instance connected to the signer
export function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  console.log("🧪 Contract address:", CONTRACT_ADDRESS);
  console.log("🧪 Contract ABI:", AidBoxTracker.abi);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, AidBoxTracker.abi, signer);

  contract.signer.getAddress()
    .then(addr => console.log("🧾 Contract signer address:", addr))
    .catch(err => console.error("⚠️ Failed to get signer address:", err));

  return contract;
}