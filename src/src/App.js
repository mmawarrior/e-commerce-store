import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Filter from './components/Filter';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import products from './components/productsData';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './components/Checkout';

const App = () => {
  const [selectedGender, setSelectedGender] = useState('all');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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
  };

  const removeAllFromCart = () => {
    setCart([]);
  };

  const checkout = () => {
    // Implement checkout logic here
  };

  // Load Stripe outside of the component to avoid reloading on every render
const stripePromise = loadStripe('sk_test_51OtVPkFgigC49c1YQh7A5bJcUr2k0Q3hoQ1Zq4TxOdW0zrxRKsIQNs5I608U9YaV0QXhtEdhVcOS1UNW5sSdM1Tk00R5uZPh9A');

  return (
    <Router>
      <Navbar setSelectedGender={setSelectedGender} />
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />

         <Elements stripe={stripePromise}>
          </Elements>
      </Routes>
    </Router>
  );
};

export default App;
