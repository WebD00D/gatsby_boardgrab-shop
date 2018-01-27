import React from "react";
import "../layouts/css/site.css";
import "../layouts/css/stripe.css";

const SellWithUs = () => (
  <div className="site-container">
    <h1 className="t-primary">Selling with Boardgrab</h1>
    <p className="t-primary" style={{ fontWeight: 400, fontSize: 14 }}>
      Boardgrab uses Stripe as our payment system. It’s just like PayPal, but
      even easier! Click the button below to allow people to pay you! If you
      don’t want more money, click the back button to return to the Boardgrab
      homepage.
    </p>
    <a
      href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://boardgrab.netlify.com/seller-confirmation/&client_id=ca_BktaykED2idsi5jlNomAw6kFOPYn9af2&state=VA"
      className="stripe-connect"
    >
      <span>Connect with Stripe</span>
    </a>
  </div>
);

export default SellWithUs;
