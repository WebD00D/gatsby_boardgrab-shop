import React, {PureComponent} from 'react';
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import fire from "../fire";
import { connect } from "react-redux";

import "../layouts/css/site.css";
import "../layouts/css/board.css";
import "../layouts/css/fcss.css";
import "../layouts/css/account.css"

import Disqus from "../components/Disqus";
import Messages from "../components/Messages";
import MyQuiver from "../components/MyQuiver";
import Settings from "../components/Settings";
import OffersReceived from "../components/OffersReceived";
import OffersMade from "../components/OffersMade";


class Account extends PureComponent {

  constructor(props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
         activeTab: 'Messages',
         stripeDashboardLink: ''
    }
  }


  handleTabChange(tab) {
    this.setState({
        activeTab: tab
    })
  }



  componentWillMount() {
        // clear notifications..
        var updates = {};
        updates['users/' + this.props.userId + '/hasNotifications'] = false
        fire.database().ref().update(updates)
        this.props.clearNotifications();


        // GET SELLERS DASHBOARD LINK...

        if ( this.props.isSeller ) {

            fetch(
              `https://boardgrab-api.herokuapp.com/get-login-link?link=${
                this.props.stripe
              }`
            ).then(function(response) {
              return response.json();
            })
            .then(function(r) {
                console.log(r.url);
                this.setState({
                  stripeDashboardLink: r.url
                })
            }.bind(this))



        }
  }

  render () {


    return (
      <div className="site-container">


         <div className="account_tabs t-sans f-13 fw-500 t-upper ls-2 fx-j-c" style={{marginBottom: '44px'}}>
            <div onClick={() => this.handleTabChange('Messages')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "Messages" })}>Messages</div>
            { this.props.isSeller ? <div onClick={() => this.handleTabChange('Received')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "Received" })}>Offers Received</div> : '' }
            <div onClick={() => this.handleTabChange('Made')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "Made" })}>Offers Made</div>
            { this.props.isSeller ? <div onClick={() => this.handleTabChange('My Quiver')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "My Quiver" })}>Listings</div> : '' }


          { this.props.isSeller
            ?  <a href={this.state.stripeDashboardLink} target="_blank" className={cx(["account_tab hover fc-black"], { "account_tab--active": this.state.activeTab === "Settings" })} style={{opacity: 0.5, color: '#808080', textDecoration: 'none'}}>Stripe Dashboard</a>
            : ''
          }


         </div>



         { this.state.activeTab === "Messages" ?  <div className="tab"><Messages /></div> : '' }
         { this.state.activeTab === "Made" ? <div className="tab"><OffersMade /></div>: '' }
         { this.state.activeTab === "Received" ? <div className="tab"><OffersReceived /></div>: '' }
         { this.state.activeTab === "My Quiver" ?  <div className="tab"><MyQuiver /></div> : '' }
         { this.state.activeTab === "Settings" ?  <div className="tab"><Settings /></div> : '' }


     </div>
    )
  }


}


const mapStateToProps = ({ userId, userAuthenticated, account_username, firstTimeLogin, allBoardsList, isSeller, stripe }) => {
    return { userId, userAuthenticated, account_username, firstTimeLogin, allBoardsList, isSeller, stripe};
  };

  const mapDispatchToProps = dispatch => {
    return {
      createAndSignInUser: (userId, account_username) => dispatch({ type: `CREATE_AND_SIGNIN_USER`, userId, account_username }),
      setCurrentUser: (userId) => dispatch({ type: `SET_CURRENT_USER`, userId }),
      getAllBoards: (boards) => dispatch({type: `GET_ALL_BOARDS`,boards}),
      clearNotifications: () => dispatch({ type: `CLEAR_NOTIFICATIONS` })

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Account);
