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


class Account extends PureComponent {

  constructor(props) {
    super(props);
    
    this.handleTabChange = this.handleTabChange.bind(this);

    this.state = {
         activeTab: 'Messages' 
    }
  }


  handleTabChange(tab) {
    this.setState({
        activeTab: tab
    })
  }
 

  render () {

    

    return (
      <div className="site-container">

     
         <div className="account_tabs t-sans f-13 fw-500 t-upper ls-2 fx-j-c">
            <div onClick={() => this.handleTabChange('Messages')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "Messages" })}>Messages</div>
            <div onClick={() => this.handleTabChange('My Quiver')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "My Quiver" })}>My Quiver</div>
            <div onClick={() => this.handleTabChange('Settings')} className={cx(["account_tab hover"], { "account_tab--active": this.state.activeTab === "Settings" })}>Settings</div>
         </div>


         { this.state.activeTab === "Messages" ?  <div className="tab"><Messages /></div> : '' }
         { this.state.activeTab === "My Quiver" ?  <div className="tab"><MyQuiver /></div> : '' }
         { this.state.activeTab === "Settings" ?  <div className="tab"><Settings /></div> : '' }



     </div>
    )
  }


}


const mapStateToProps = ({ userId, userAuthenticated, account_username, firstTimeLogin, allBoardsList }) => {
    return { userId, userAuthenticated, account_username, firstTimeLogin, allBoardsList };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      createAndSignInUser: (userId, account_username) => dispatch({ type: `CREATE_AND_SIGNIN_USER`, userId, account_username }),
      setCurrentUser: (userId) => dispatch({ type: `SET_CURRENT_USER`, userId }),
      getAllBoards: (boards) => dispatch({type: `GET_ALL_BOARDS`,boards}),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Account);