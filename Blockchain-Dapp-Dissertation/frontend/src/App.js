import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/layout/Header';
import SearchHeader from './components/layout/SearchHeader';
import DeliveryCard from './components/cards/DeliveryCard';
import { aidDeliveries } from './components/data/mockData';
import 'bootstrap/dist/css/bootstrap.min.css';

// account: stores the Ethereum account connected to the DApp
// searchValue: what the user types into the search input
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      searchValue: '',
    };
  }

  // connects to local eth node or metamask and gets first wallet address and saves to state
  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  // search component, controls whats in search bar and starts live filtering on delivery cards
  render() {
    const { searchValue } = this.state;

    const filteredDeliveries = aidDeliveries.filter((d) =>
      d.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      d.senderName.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div className="app-wrapper d-flex">
        <Sidebar />
        <div className="main-content flex-grow-1 position-relative">
          {/* Map behind everything */}
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

          {/* Overlay content */}
          <div className="content-overlay">
            <Header />
            <div className="text-end mb-2 px-3">
              <small className="text-muted">
                Connected account: {this.state.account}
              </small>
            </div>

            {/* Blurred container with search and cards */}
            <div className="blurred-container">
              <SearchHeader
                searchValue={this.state.searchValue}
                onSearch={(val) => this.setState({ searchValue: val })}
              />
              {filteredDeliveries.map((delivery) => (
                <DeliveryCard key={delivery.id} delivery={delivery} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
