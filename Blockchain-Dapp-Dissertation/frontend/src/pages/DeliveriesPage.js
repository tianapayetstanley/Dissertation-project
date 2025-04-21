import React from 'react';
import './DeliveriesPage.css';
import { deliveries } from '../components/data/mockDeliveries';

const DeliveriesPage = () => {
  return (
    <div className="blurred-container deliveries-page">
      <h2 className="deliveries-heading">Recent Deliveries</h2>
      <table className="deliveries-table">
        <thead>
          <tr>
            <th>Box ID</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.id}</td>
              <td>
                <span className={`status-badge ${delivery.status.toLowerCase()}`}>
                  {delivery.status}
                </span>
              </td>
              <td>{delivery.from}</td>
              <td>{delivery.to}</td>
              <td>{delivery.date}</td>
              <td>
                <a
                  href={delivery.txLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  View Tx ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesPage;
