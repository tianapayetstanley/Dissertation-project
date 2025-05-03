import { ethers } from "ethers";
import AidBoxTracker from '../contracts/AidBoxTracker.json'; // ✅ ABI JSON file inside frontend/src/contracts

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ Replace with your deployed contract address

// Connects MetaMask wallet
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

// Returns the contract instance connected to the signer
export function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // 🔍 Helpful debug logs
  console.log("🧪 Contract address:", CONTRACT_ADDRESS);
  console.log("🧪 Contract ABI:", AidBoxTracker.abi);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, AidBoxTracker.abi, signer);

  // Optional: confirm signer is from MetaMask
  contract.signer.getAddress().then(addr => {
    console.log("🧾 Contract signer address:", addr);
  }).catch(err => {
    console.error("⚠️ Failed to get signer address:", err);
  });

  return contract;
}
