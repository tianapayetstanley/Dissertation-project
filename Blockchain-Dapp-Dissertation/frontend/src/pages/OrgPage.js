import React from 'react';
import './OrgPage.css';
import { orgs } from '../components/data/mockOrgs';

const OrgPage = () => {
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
              <button className="btn btn-outline-primary">Collaborate</button>
              <button className="btn btn-outline-success">Share Funds</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgPage;
