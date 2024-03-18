import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './cart.css';

const Cart = ({ cart, addToCart, subtractFromCart, removeFromCart, removeAllFromCart, checkout }) => {
    const [showSubtractInput, setShowSubtractInput] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleFocus = () => {
        setShowSubtractInput(true);
    };

    const handleCheckout = () => {
        // Redirect to checkout page when checkout button is clicked
        navigate("/checkout");
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-content">
                <div className="cart-items-container">
                    <div className="remove-all-cart">
                        <button id="remove-all-button" onClick={removeAllFromCart}>Remove All</button>
                    </div>
                    <div className="cart-header">
                        <div>Item</div>
                        <div>Name</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                        <div>Action</div>
                    </div>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={`/${item.image}`} alt={item.name} />
                            <div className="item-name">{item.name}</div>
                            <div className="item-price">${item.price}</div>
                            <div className="item-quantity">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        if (!isNaN(newQuantity)) {
                                            if (newQuantity > item.quantity) {
                                                addToCart({ ...item, quantity: newQuantity });
                                            } else {
                                                subtractFromCart({ ...item, quantity: newQuantity });
                                            }
                                        }
                                    }}
                                />
                                {showSubtractInput && (
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onFocus={handleFocus}
                                        onBlur={() => setShowSubtractInput(false)}
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value);
                                            if (!isNaN(newQuantity)) {
                                                if (newQuantity > item.quantity) {
                                                    addToCart({ ...item, quantity: newQuantity });
                                                } else {
                                                    subtractFromCart({ ...item, quantity: newQuantity });
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </div>
                            <div className="item-total">${item.price * item.quantity}</div>
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </div>
                    ))}
                    <div className="checkout-info-wrapper">
                        <p id="total-items">Total Items: {cart.length}</p>
                        <p id="total-price">Total Price: ${totalPrice}</p>
                        <button id="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
