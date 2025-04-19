import React from 'react';
import './SearchHeader.css';

const SearchHeader = ({ searchValue, onSearch }) => {
  return (
    <div className="search-header">
      <input
        type="text"
        placeholder="Search aid box ID or sender..."
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <h4 className="section-title">Ongoing Deliveries</h4>
    </div>
  );
};

export default SearchHeader;
