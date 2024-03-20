import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import Navbar.css

import cartIcon from './cart-icon.svg';

const Navbar = ({ setSelectedGender, cart }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">logo</Link>
        </div>
        <input type="checkbox" id="menu-toggle" checked={menuOpen} onChange={handleMenuToggle} />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="/filter"
              onClick={() => {
                setSelectedGender('men');
                handleMenuItemClick(); // Close the menu
              }}
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/filter"
              onClick={() => {
                setSelectedGender('girls');
                handleMenuItemClick(); // Close the menu
              }}
            >
              Girls
            </Link>
          </li>
          <li>
            <Link
              to="/filter"
              onClick={() => {
                setSelectedGender('boys');
                handleMenuItemClick(); // Close the menu
              }}
            >
              Boys
            </Link>
          </li>
        </ul>
        <div className="cart-icon">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" />
            {cart && cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
