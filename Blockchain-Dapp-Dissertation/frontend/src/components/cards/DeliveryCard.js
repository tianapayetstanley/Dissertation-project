import React from 'react';
import './DeliveryCard.css';
import boxImg from '../../assets/images/aidbox.png';
import profileImg from '../../assets/images/charity_recipent_circle.png'; // Update to your image filename

const DeliveryCard = ({ delivery }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div>
          <p className="aid-box-label">Aid Box ID</p>
          <h4 className="aid-box-id">{delivery.id}</h4>
          <p className="aid-box-type">{delivery.type}</p>
        </div>
        <img src={boxImg} alt="Aid Box" className="aid-box-image" />
      </div>

      <div className="locations">
        <p className="location-text">{delivery.from}</p>
        <p className="location-text">{delivery.to}</p>
      </div>

      <span className={`status-label ${delivery.status.toLowerCase().replace(/\s+/g, '-')}`}>
        {delivery.status}
      </span>

      <div className="sender-info">
        <div className="sender-text">
          <p className="sender-label">Sender</p>
          <p className="sender-name">{delivery.senderName}</p>
          <p className="sender-org">{delivery.organization}</p>
        </div>
        <div className="sender-avatar">
          <img src={profileImg} alt="Sender" className="sender-image" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
