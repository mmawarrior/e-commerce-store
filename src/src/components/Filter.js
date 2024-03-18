// Filter.js
import React, { useState, useEffect } from 'react';
import './Filter.css';
import { Link } from 'react-router-dom';
import products from './productsData';

const Filter = ({ selectedGender, setSelectedGender }) => {

  const [minPrice, setMinPrice] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    updateProducts();
  }, [selectedGender, minPrice, searchTerm, sortOrder]);

  const updateProducts = () => {
    let filteredProducts = products.filter((product) => {
      const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
      const matchesPrice = product.price >= minPrice;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGender && matchesPrice && matchesSearch;
    });

    if (sortOrder === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filteredProducts);
  };

  const displayProducts = () => {
    return filteredProducts.map((product) => (
      <div key={product.id} className="product">
        <Link
          to={{
            pathname: `/product/${product.id}`,
            state: { product },
          }}
          className="product-link"
        >
          <img src={`${product.image}`} alt={product.name} />
          <h3 id={`product-name-${product.id}`}>{product.name}</h3>
          <p id={`product-gender-${product.id}`}>Gender: {product.gender}</p>
          <p id={`product-price-${product.id}`}>Price: ${product.price}</p>
        </Link>
      </div>
    ));
  };
  

  return (
    <div>
      <header>
        <h1>Product Search</h1>
      </header>

      <div id="filter-container">
        <div className="filter-column">
          <div>
            <label htmlFor="gender">Select Gender:</label>
            <select
              id="gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="all">All</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
              <option value="men">Men</option>
            </select>
          </div>

          <div>
            <label htmlFor="price-range">Price Range:</label>
            <input
              type="range"
              id="price-range"
              min="0"
              max="100"
              step="10"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
            <span id="price-display">{minPrice}</span>
          </div>

          <div>
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sort-order">Sort Order:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        <div className="product-column">
          <div id="products-container">{displayProducts()}</div>
        </div>
      </div>

    </div>
  );
};

export default Filter;
