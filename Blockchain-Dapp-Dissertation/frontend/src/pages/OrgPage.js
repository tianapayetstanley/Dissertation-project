import React from 'react';
import './OrgPage.css';
import { orgs } from '../components/data/mockOrgs';
import { getContract } from "../contracts/aidBoxTracker";
import { toast } from 'react-toastify';

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
              <button className="btn btn-outline-success">Share Funds</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgPage;
