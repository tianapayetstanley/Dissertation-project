import { ethers } from "ethers";//code for connecting to metamask

export const CONTRACT_ADDRESS = "0x3237E990D81F9945AC6a3019E2fc2D73C1d7A25";// npx hardhat run ...

export const ABI = [
  "function shareFunds(address toOrg, uint256 boxId) external payable",
  "function getAidBox(uint256 id) public view returns (uint256, string, string)",
  "event FundsShared(address indexed sender, address indexed receiver, uint256 boxId, uint256 timestamp)",
  "event AidBoxStatusUpdated(uint256 id, string newStatus)"
];

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signerOrProvider);
}
