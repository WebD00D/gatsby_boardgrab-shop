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

        if ( code ) {

            //  endpoint-> /stripe-registration?code=thecode
            fetch(`https://boardgrab-api.herokuapp.com/stripe-registration?code=${code}`)
            .then(function(response) {
              return response.json()
            }).then(function(r) {
              console.log('parsed json from stripe-registration', r)

              let s = JSON.parse(r.text)
              //  console.log("SAVE THIS STRIPE USER ID!!!!!!!", s.stripe_user_id);

							let updates = {};
							updates['users/' + this.props.userId + '/seller'] = true
							updates['users/' + this.props.userId + '/stripe'] = s.stripe_user_id

							fire.database().ref().update(updates)

              // UPDATE STATE..
              this.props.updateSellerInfo(true, s.stripe_user_id);


            }.bind(this)).catch(function(ex) {
              console.log('parsing failed', ex)
            })

        } else {
          console.log("NO CODE!");
        }



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
		return (
      <div className="site-container--sm">

        <div className="t-sans fw-500 f-28 m-b-30">You're all setup!</div>
        <div className="t-sans ">
         Welcome to the Boardgrab seller's community. You're what keeps this whole ship afloat. So, first
         and foremost, thank you.
         <br /><br />
          Now that you are all good to go with Stripe, there's a few handy things to know as seller.
        <br/><br />
        You can find the secure link to your stripe sellers dashboard by going to your Boardgrab account page, clicking on settings,
        then the "Stripe Dashboard" link. In your Stripe dashboard, you'll be able to view your Boardgrab payout history,
        as well as update settings like bank info, linked accounts, and more. If you'd like to learn a bit more
        about our payment partner, check out this link <a href="#" className="fc-green">here.</a>

         <br /><br />
         If you have any questions at all, feel free to check out the <a href="#" className="fc-green">Boardgrab Support Site</a>,
         or reach out to us directly via email at <a className="fc-green" href="#">help@boardgrab.com</a>.
        <br /><br />
        ...

        </div>

      </div>
    );
	}
}

const mapStateToProps = ({ userId, shop_coast, dropDownCityList }) => {
  return { userId, shop_coast, dropDownCityList };
};

const mapDispatchToProps = dispatch => {
  return {
    setListingCities: (region) => dispatch({ type: `SET_LISTING_CITIES`, region }),
    setCurrentUser: (userId, username, email, hasNotifications, paypal_email, seller) => dispatch({ type: `SET_CURRENT_USER`, userId, username, email, hasNotifications, paypal_email, seller }),
		updateSellerInfo: ( seller, stripe ) => dispatch({ type: `SET_NEW_SELLER_INFO`, seller, stripe })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerConfirmation);
