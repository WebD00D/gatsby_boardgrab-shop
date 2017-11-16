import React from 'react';
import "../layouts/css/site.css";
import "../layouts/css/stripe.css";

const SellWithUs = () => (
  <div className="site-container">
    <h1 className="t-primary">Selling with Boardgrab</h1>
    <p className="t-primary" style={{fontWeight: 400, fontSize: 14}}>
     Boardgrab uses Stripe to get you paid quickly and keep your personal and payment information secure. 
     Thousands of companies around the world trust Stripe to process payments for their users. 
     Set up a Stripe account to get paid with Boardgrab.
    </p>
    <a 
      href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:8000/seller-confirmation/&client_id=ca_BktaykED2idsi5jlNomAw6kFOPYn9af2&state=VA" 
      className="stripe-connect">
      <span>Connect with Stripe</span>
   </a>
  </div>
)

export default SellWithUs
