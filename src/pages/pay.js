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


class Payment extends PureComponent {

  constructor(props) {
    super(props);

    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
        token: '',
        status: '',
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
          this.setState({
              token: token.id,
          })

          // SEND TOKEN AND OTHER DEETZ OFF TO BG API.. 


        }.bind(this)
      });

      handler.open({
        name: 'Boardgrab, LLC',
        description: '2 widgets',
        amount: 2000,
       
      });

  }
 

  componentDidMount() {
    // get board param id
    // const sendMessageTo = this.getQueryVariable("from");
    // this.setState({
    //   sendMessageBackTo: sendMessageTo
    // })
  
    
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


  componentDidMount() {
    
  }




  render() {

    
   

    return (
      <div className="site-container">
        {this.state.token}

        { this.state.status }
        <button onClick={() => this.handlePayment()}>Pay $100</button>

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
