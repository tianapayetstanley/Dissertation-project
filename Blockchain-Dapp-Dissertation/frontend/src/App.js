import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/layout/Header';
import DeliveryCard from './components/cards/DeliveryCard';
import { aidDeliveries } from './components/data/mockData';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { account: '' };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  render() {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Header />
          <div className="text-end mb-3">
            <small className="text-muted">
              Connected account: {this.state.account}
            </small>
          </div>

          <div className="row">
            {/* Left: Delivery Cards */}
            <div className="col-md-4">
              {Array.isArray(aidDeliveries) &&
                aidDeliveries.map((delivery) => (
                  <DeliveryCard key={delivery.id} delivery={delivery} />
                ))}
            </div>

            {/* Right: Google Map iframe */}
            <div className="col-md-8">
              <div style={{ height: '80vh', width: '100%' }}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
