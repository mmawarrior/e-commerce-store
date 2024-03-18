import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Filter from './components/Filter';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import products from './components/productsData';
import Checkout from './components/checkout'; // Import the Checkout component

const App = () => {
  const [selectedGender, setSelectedGender] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Add state for cart count

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Update cart count
    setCartCount(prevCount => prevCount + 1);
  };

  const subtractFromCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1 && cart[existingItemIndex].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);

    // Update cart count
    setCartCount(prevCount => prevCount - product.quantity);
  };

  const removeAllFromCart = () => {
    setCart([]);

    // Update cart count
    setCartCount(0);
  };

  const checkout = () => {
    // Implement checkout logic here
  };

  return (
    <Router>
      <Navbar cartCount={cartCount} setSelectedGender={setSelectedGender} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/filter"
          element={<Filter products={products} selectedGender={selectedGender} setSelectedGender={setSelectedGender} addToCart={addToCart} />}
        />
        <Route
          path="/product/:productId"
          element={<ProductDetail products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} addToCart={addToCart} subtractFromCart={subtractFromCart} removeFromCart={removeFromCart} removeAllFromCart={removeAllFromCart} checkout={checkout} />}
        />
        <Route path="/checkout" element={<Checkout />} /> {/* Add a new route for the checkout component */}
      </Routes>
    </Router>
  );
};

export default App;
