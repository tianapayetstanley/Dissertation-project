import React from 'react';
import './OrgPage.css';
import { orgs } from '../components/data/mockOrgs';

import { connectWallet, getContract } from "../utils/ethereum"; // ✅ MetaMask + contract helper
import { ethers } from "ethers"; // ✅ Needed for parseEther and address checksum
import { toast } from 'react-toastify';

// ❌ Removed because it's unused directly in this file (you use getContract instead)
// import AidBoxTracker from "../contracts/AidBoxTracker.json"; 

// ❌ Also removed: unused duplicate contract getter
// import { getContract as getAidBoxContract } from "../contracts/aidBoxTracker"; 


const OrgPage = ({ contract, account }) => {
  const handleCollaboration = async (orgAddress, orgName) => {
    try {
      if (!contract || !account) {
        toast.error("Contract or account not loaded");
        return;
      }

      const tx = await contract.requestCollaboration(orgAddress, `We’d like to collaborate with ${orgName}`);
      await tx.wait();

      toast.success(`🤝 Collaboration request sent to ${orgName}`);
    } catch (err) {
      toast.error("❌ Collaboration failed: " + err.message);
    }
  };

  const handleShareFunds = async (recipientAddress) => {
    try {
      console.log("💡 raw recipient address:", recipientAddress);
  
      const connected = await connectWallet();
      if (!connected) {
        return;
      }
  
      const contract = getContract();
      const boxId = 0;
  
      const checksummedAddress = ethers.utils.getAddress(recipientAddress);
      console.log("✅ checksummed address:", checksummedAddress);
  
      const tx = await contract.shareFunds(checksummedAddress, boxId, {
        value: ethers.utils.parseEther("0.00001"),
      });
  
      await tx.wait();
      toast.success("💸 0.00001 ETH shared successfully");
    } catch (err) {
      toast.error("❌ Sharing funds failed: " + err.message);
    }
  };
  
  

  return (
    <div className="blurred-container org-page">
      <h2 className="org-heading">Explore Partner Organizations</h2>
      <div className="org-list">
        {orgs.map((org) => (
          <div className="org-card" key={org.id}>
            <img src={org.logo} alt={`${org.name} logo`} className="org-logo" />
            <h3>{org.name}</h3>
            <p className="org-description">{org.description}</p>
            <p className="org-location"><strong>Location:</strong> {org.location}</p>
            <div className="org-tags">
              {org.tags.map((tag, i) => (
                <span className="org-tag" key={i}>{tag}</span>
              ))}
            </div>
            <div className="org-actions">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleCollaboration(org.address, org.name)}
              >
                Collaborate
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => handleShareFunds(org.address)} // 👈 wired here
              >
                Share Funds
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgPage;
