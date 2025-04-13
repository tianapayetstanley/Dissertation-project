import React from 'react';

const SimpleMap = ({ address = "2972 Westheimer Rd, Santa Ana, Illinois 85486" }) => {
  const query = encodeURIComponent(address);
  const apiKey = "AIzaSyDAkKrSAapZ82yX8RxFYyLmdYAgy_8htPg";

  return (
    <iframe
      title="Google Map"
      width="100%"
      height="400"
      frameBorder="0"
      style={{ border: 0, borderRadius: '8px' }}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`}
      allowFullScreen
    />
  );
};

export default SimpleMap;
