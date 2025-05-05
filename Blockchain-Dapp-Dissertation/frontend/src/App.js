import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/layout/Header';
import SearchHeader from './components/layout/SearchHeader';
import DeliveryCard from './components/cards/DeliveryCard';
import { aidDeliveries } from './components/data/mockData';
import AppRoutes from './routes/routes';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AidBoxTracker from './contracts/AidBoxTracker.json';

const App = () => {
  const [account, setAccount] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [contract, setContract] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
  
          //  Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
  
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]); // Save for use in `from:` when sending tx
          console.log("✅ MetaMask account connected:", accounts[0]);
  
          // HARDCODED deployed contract address
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
          const instance = new web3.eth.Contract(
            AidBoxTracker.abi,
            contractAddress
          );
          setContract(instance);
          console.log("✅ Contract loaded:", instance);
        } catch (error) {
          console.error("❌ Failed to load blockchain data:", error);
          alert("MetaMask connection failed. Check the console for details.");
        }
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    };
  
    loadBlockchainData();
  }, []);
  
  
  
  const filteredDeliveries = aidDeliveries.filter((d) =>
    d.id.toLowerCase().includes(searchValue.toLowerCase()) ||
    d.senderName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Immutable Aid Dashboard';
      case '/about':
        return 'Immutable Aid - About';
      case '/organizations':
        return 'Immutable Aid - Organizations';
      case '/deliveries':
        return 'Immutable Aid - Deliveries';
      default:
        return 'Immutable Aid';
    }
  };

  const isDashboard = location.pathname === '/';

  return (
    <div className="app-wrapper d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1 position-relative">
        <div className="map-background">
          <iframe
            title="Delivery Route"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDAkKrSAapZ82yX8RxFYyLmdYAgy_8htPg&origin=2972+Westheimer+Rd,+Santa+Ana,+IL+85486&destination=8502+Preston+Rd,+Inglewood,+ME+98380`}
            allowFullScreen
          ></iframe>
        </div>

        <div className="content-overlay">
          <div className="header-bar">
            <h1 className="header-title">{getPageTitle(location.pathname)}</h1>
          </div>

          <div className="text-end mb-2 px-3">
            <small className="text-muted">Connected account: {account}</small>
          </div>

          <div className="blurred-container centered-content">
            {isDashboard && (
              <>
                <SearchHeader
                  searchValue={searchValue}
                  onSearch={(val) => setSearchValue(val)}
                />
                {filteredDeliveries.map((delivery) => (
                  <DeliveryCard key={delivery.id} delivery={delivery} />
                ))}
              </>
            )}
            <AppRoutes account={account} contract={contract} />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
