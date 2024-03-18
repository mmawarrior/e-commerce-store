import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import './checkout.css';

const stripePromise = loadStripe('pk_test_51OtVPkFgigC49c1YQh7A5bJcUr2k0Q3hoQ1Zq4TxOdW0zrxRKsIQNs5I608U9YaV0QXhtEdhVcOS1UNW5sSdM1Tk00R5uZPh9A'); // Define stripePromise with your Stripe publishable key

const Checkout = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Send paymentMethod.id to your server for processing
      console.log('Payment Method:', paymentMethod);
    }
  };

  return (
    <div className="container">  
      <form id="contact" onSubmit={handleSubmit}>
        <h3>Checkout</h3>
        <h4>Enter your details to complete the purchase</h4>
        <fieldset>
          <input placeholder="Name" type="text" id="name" name="name" required />
        </fieldset>
        <fieldset>
          <input placeholder="Email Address" type="email" id="email" name="email" required />
        </fieldset>
        <fieldset>
          <input placeholder="Phone Number (optional)" type="tel" id="phone" name="phone" />
        </fieldset>
        <fieldset>
          <input placeholder="Address (optional)" type="text" id="address" name="address" />
        </fieldset>
        <fieldset>
          <textarea placeholder="Additional Information (optional)" id="message" name="message"></textarea>
        </fieldset>
        <fieldset>
          <CardElement />
        </fieldset>
        <fieldset>
          <button name="submit" type="submit" id="contact-submit" disabled={!stripe} data-submit="...Processing">
            Pay ${totalPrice}
          </button>
        </fieldset>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

const CheckoutWithElements = ({ totalPrice }) => (
  <Elements stripe={stripePromise}>
    <Checkout totalPrice={totalPrice} />
  </Elements>
);

export default CheckoutWithElements;
