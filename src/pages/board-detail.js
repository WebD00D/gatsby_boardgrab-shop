import React, {PureComponent} from 'react';
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import "../layouts/css/site.css";
import { connect } from "react-redux";

import Disqus from "../components/Disqus";


class BoardDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        board: ''
    }
  }

  
  render () {

    return (
    <div className="site-container">
    <Disqus title="Board Comments" shortname="boardgrab-comments" identifier={this.state.board} />
    </div>)
  }


}


const mapStateToProps = ({ userId, userAuthenticated, account_username, firstTimeLogin }) => {
    return { userId, userAuthenticated, account_username, firstTimeLogin };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      createAndSignInUser: (userId, account_username) => dispatch({ type: `CREATE_AND_SIGNIN_USER`, userId, account_username }),
      setCurrentUser: (userId) => dispatch({ type: `SET_CURRENT_USER`, userId })   
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);