// SearchBar.js
import React from 'react';
import '../css/searchBar.css'; // CSS cho thanh tìm kiếm

const SearchBar = () => {
  return (
    <div className="search-container">
      <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-input" />
      <i className="fas fa-search search-icon"></i>
    </div>
  );
};

export default SearchBar;
