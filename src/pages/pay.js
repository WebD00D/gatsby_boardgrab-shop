import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import "../layouts/css/site.css";
import "../layouts/css/board.css";
import "../layouts/css/fcss.css";
import "../layouts/css/tables.css";
import cx from "classnames";
import Link from "gatsby-link";
import Moment from "react-moment";
import _ from "lodash";
import { connect } from "react-redux";
import 'whatwg-fetch';



class Payment extends PureComponent {

  constructor(props) {
    super(props);

    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
        stripeUser: '',
        amount: 0,

        board: `5'8" Rusty Dwart`
    };

    
  }


handlePayment() {

    const handler = StripeCheckout.configure({
        key: 'pk_test_1cazrtmAqKca0bS7yjBlPNsC',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        zipCode: true,
        token: function(token) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log("PAYMENT TOKEN", token)
        //   this.setState({
        //       token: token.id,
        //   })

          // SEND TOKEN AND OTHER DEETZ OFF TO BG API..

          //payment?token=tok_1BRuVbADZeBlrWSetjg4gTae&stripeUser=acct_1BQEFpJpXcqqlmC6&amount=7800

          fetch(`https://boardgrab-api.herokuapp.com/payment?token=${token.id}&stripeUser=${this.state.stripeUser}&amount=${this.state.amount}`)
          .then(function(response) {
            return response.json()
          }).then(function(r) {
            
            console.log('PAYMENT OBJECT FROM API', r)


                
          }.bind(this)).catch(function(ex) {
            console.log('parsing failed', ex)
          })
          
        

        }.bind(this)
      });

      handler.open({
        name: 'BOARDGRAB',
        description: this.state.board,
        amount: this.state.amount,
       
      });

  }
 

  componentDidMount() {
    
    const stripeUser = this.getQueryVariable("stripeUser");
    const amount = this.getQueryVariable("amount");

    this.setState({
        stripeUser: stripeUser,
        amount: amount
    })


  
    
  }

  getQueryVariable(variable) {

    // BUG: Failing on Netlify deploy. Window is not defined. 
    // NOTE: I though since this was in componentDidMount that window would be available.
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }


  render() {

    
    let amountToShow = ( parseFloat(this.state.amount) / 100 );

    return (
      <div className="site-container">

        <div className="f-28 t-sans ls-2 fw-500 m-b-20">Payment</div>
        <div className="f-16 t-sans">
            You're one step closer to getting your hands on that new (used) board! Just click
            the payment button below, fill out your card info, and that's it. We'll send a notification
            to the seller that you're all squared away, and that the two of you can continue confidently through your transaction.
        </div>
        <hr />
        <div className="f-16 t-sans"> <span className="fw-500">Board:</span> 5'8" Rusty Dwart</div>
        <div className="f-16 t-sans"> <span className="fw-500">Seller:</span> board_slinger69</div>
        <div className="f-16 t-sans m-b-20"> <span className="fw-500">Amount:</span> ${amountToShow}</div>

        <button
          className="message-box__button ls-2"
         onClick={() => this.handlePayment()}>Pay ${amountToShow}</button>

      </div>
    );
  }
}

const mapStateToProps = ({
  userId,
  userAuthenticated,
  account_username,
  firstTimeLogin,
  allBoardsList
}) => {
  return {
    userId,
    userAuthenticated,
    account_username,
    firstTimeLogin,
    allBoardsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAndSignInUser: (userId, account_username) =>
      dispatch({ type: `CREATE_AND_SIGNIN_USER`, userId, account_username }),
    setCurrentUser: userId => dispatch({ type: `SET_CURRENT_USER`, userId }),
    getAllBoards: boards => dispatch({ type: `GET_ALL_BOARDS`, boards })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
