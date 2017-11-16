import React, { Component } from "react";
import Link from "gatsby-link";
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
//import boardfax from "../boardfax";
import FatherTime from "../utils/fatherTime";
import FileUploader from "react-firebase-file-uploader";
import { connect } from "react-redux";
import Moment from "react-moment";
import 'whatwg-fetch';

import "../layouts/css/login.css";
import "../layouts/css/listing.css";
import "../layouts/css/tables.css";
import "../layouts/css/fcss.css";
import "../layouts/css/button.css";

class SellerConfirmation extends Component {
	constructor(props) {
    super(props);
    
    this.getCookie = this.getCookie.bind(this);
    this.getQueryVariable = this.getQueryVariable.bind(this);
	}

	componentWillMount() {
    // we should have a logged in user at this point.
    const bgcookie = this.getCookie('boardgrab_user');
    console.log('bg cookie', bgcookie);

    if ( bgcookie ) {

      fire.database().ref('users/' + bgcookie).once('value').then(function(snapshot){
        console.log("SIGN IN SNAPSHOT", snapshot.val());
        this.props.setCurrentUser(
          bgcookie, 
          snapshot.val().username, 
          snapshot.val().email, 
          snapshot.val().hasNotifications,
          snapshot.val().paypal_email,
          snapshot.val().seller
        );

      }.bind(this)).then(function(){

        // handle the api request to officially register the user..
        const code = this.getQueryVariable("code");

        //  endpoint-> /stripe-registration?code=thecode
        fetch(`https://boardgrab-api.herokuapp.com/stripe-registration?code=${code}`)
        .then(function(response) {
          return response.json()
        }).then(function(r) {
          console.log('parsed json from stripe-registration', r)

          let s = JSON.parse(r.text)
          console.log("SAVE THIS STRIPE USER ID!!!!!!!", s.stripe_user_id);


        }.bind(this)).catch(function(ex) {
          console.log('parsing failed', ex)
        })
   


      }.bind(this))


    }
    
  }
  
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
 

	getCookie(cname) {
		var name = cname + '=';
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	render() {
		return <div className="site-container--sm">Seller Confirmation</div>;
	}
}

const mapStateToProps = ({ userId, shop_coast, dropDownCityList }) => {
  return { userId, shop_coast, dropDownCityList };
};

const mapDispatchToProps = dispatch => {
  return { 
    setListingCities: (region) => dispatch({ type: `SET_LISTING_CITIES`, region }),
    setCurrentUser: (userId, username, email, hasNotifications, paypal_email, seller) => dispatch({ type: `SET_CURRENT_USER`, userId, username, email, hasNotifications, paypal_email, seller })   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerConfirmation);


