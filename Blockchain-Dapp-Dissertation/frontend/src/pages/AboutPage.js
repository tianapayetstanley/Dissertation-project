import React from 'react';
import './AboutPage.css';
import { FaSearchLocation, FaBox, FaHandshake, FaMoneyCheckAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero">
        <h1>Transparent Aid. Real Impact.</h1>
        <p>
          Immutable Aid is a blockchain-powered platform enabling cross-organizational collaboration and secure delivery tracking in humanitarian efforts.
        </p>
      </section>

      <section className="why-blockchain">
        <h2>Why Blockchain + Polkadot</h2>
        <p>
          Traditional aid delivery is siloed, difficult to audit, and lacks real-time collaboration. With Polkadot’s Inter-Blockchain Communication (XCM), Immutable Aid enables transparent coordination across chains, empowering different organizations to deliver better, together.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <FaSearchLocation className="feature-icon" />
            <h3>Live Tracking</h3>
            <p>View real-time status and location of aid deliveries across chains.</p>
          </div>
          <div className="feature">
            <FaBox className="feature-icon" />
            <h3>Immutable Registry</h3>
            <p>Each aid box is logged immutably with sender and recipient info.</p>
          </div>
          <div className="feature">
            <FaHandshake className="feature-icon" />
            <h3>Org Collaboration</h3>
            <p>Organizations can interact, verify, and support each other’s deliveries.</p>
          </div>
          <div className="feature">
            <FaMoneyCheckAlt className="feature-icon" />
            <h3>Transparent Payments</h3>
            <p>Simulated token transfers ensure fair value exchange per delivery.</p>
          </div>
        </div>
      </section>

      <section className="tech">
        <h2>Technical Overview</h2>
        <p>
          This DApp is built using React, Polkadot.js, and Web3.js. It connects to live wallets and simulates IBC via delivery state sharing and token transfers. The frontend is fully modular and ready to integrate smart contracts or runtime modules.
        </p>
      </section>

      <section className="creator">
        <h2>About the Creator</h2>
        <p>
          Created as part of a BSc Computer Science dissertation at the University of East London (2025), Immutable Aid was designed and built by Tiana Stanley to reimagine how humanitarian aid can be tracked, verified, and trusted globally.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;