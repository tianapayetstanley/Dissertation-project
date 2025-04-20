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

const App = () => {
  const [account, setAccount] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    loadBlockchainData();
  }, []);

  const filteredDeliveries = aidDeliveries.filter((d) =>
    d.id.toLowerCase().includes(searchValue.toLowerCase()) ||
    d.senderName.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          <Header />
          <div className="text-end mb-2 px-3">
            <small className="text-muted">Connected account: {account}</small>
          </div>

          <div className="blurred-container">
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
            <AppRoutes account={account} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
