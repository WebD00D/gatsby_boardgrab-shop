import React, {PureComponent} from 'react';
import cx from "classnames";
import fire from "../fire";
import { connect } from "react-redux";
import _ from "lodash";

import "../layouts/css/login.css";
import "../layouts/css/listing.css";
import "../layouts/css/tables.css";
import "../layouts/css/fcss.css";
import "../layouts/css/button.css";


class Messages extends PureComponent {

  constructor(props) {
      super(props);

      this.handleMessageTabChange = this.handleMessageTabChange.bind(this);

      this.state = {
        activeTab: 'buy',
        messages: {}
      }

  }

  componentDidMount() {
    // GET ALL USERS MESSAGE PREVIEWS.
    fire.database().ref('/users/' + this.props.userId + '/messagePreviews' ).once('value').then(function(snapshot){
      console.log("USER MESSAGE PREVIEWS", snapshot.val())
      
      this.setState({
        messages: snapshot.val()
      })

    }.bind(this))

  }

  handleMessageTabChange (tab) {
    this.setState({
      activeTab: tab
    })
  }



  render() {


    const messages = this.state.messages;
    const buyMessages = [];
    const sellMessages = [];
    _.forEach(messages, function(value, key) {

     
      if ( value.messageType === "SELL") {
        sellMessages.push(
          <div key={key} className="table-row">
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-30p">
              {value.boardName}
            </div>
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-30p">
              {value.buyerUser}
            </div>
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-40p">
              {value.lastMessage.substr(0,30)}...
            </div>
          </div>
        );
      } else {
        buyMessages.push(
          <div key={key} className="table-row">
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-30p">
              {value.boardName}
            </div>
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-30p">
              {value.sellerUser}
            </div>
            <div className="t-sans f-11 t-upper fw-500 ls-2 w-40p">
            {value.lastMessage.substr(0,30)}...
            </div>
 
          </div>
        );
      }

      
    }.bind(this));



// boardName
// :
// "6'4" Chilli Pretty Sweet "
// buyerUser
// :
// "boardlover69"
// from
// :
// "Eh4dCWSiB6NioRMAPLQ4klDfRWG3"
// lastMessage
// :
// "updated from boardlove69"
// lastMessageDate
// :
// "2017-11-21T12:43:49.038Z"
// messageType
// :
// "SELL"
// read
// :
// false




    return (
        <div>
        
          <div className="message-type-container" style={{marginBottom: '28px'}}>
              <div onClick={() => this.handleMessageTabChange("buy")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "buy" }])}>BUY MESSAGES</div>
              <div onClick={() => this.handleMessageTabChange("sell")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "sell" }])}>SELL MESSAGES</div>
          </div>


          { this.state.activeTab === "buy" 
           ?
           <div><div className="table-rows"> {buyMessages}</div> </div>
           :
           <div><div className="table-rows">{sellMessages}</div> </div>
           }
          

          


        
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages);