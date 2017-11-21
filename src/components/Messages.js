import React, {PureComponent} from 'react';
import cx from "classnames";
import fire from "../fire";
import { connect } from "react-redux";


class Messages extends PureComponent {

  constructor(props) {
      super(props);

      this.handleMessageTabChange = this.handleMessageTabChange.bind(this);

      this.state = {
        activeTab: 'buy',
        messages: []
      }

  }

  componentDidMount() {
    // GET ALL USERS MESSAGE PREVIEWS.
    fire.database().ref('/users/' + this.props.userId + '/messagePreviews' ).once('value').then(function(snapshot){
			console.log("USER MESSAGE PREVIEWS", snapshot.val())
    }.bind(this))

  }

  handleMessageTabChange (tab) {
    this.setState({
      activeTab: tab
    })
  }



  render() {
    return (
        <div>
        
          <div className="message-type-container">
              <div onClick={() => this.handleMessageTabChange("buy")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "buy" }])}>BUY MESSAGES</div>
              <div onClick={() => this.handleMessageTabChange("sell")} className={cx([ "message-type-button t-sans ls-2 hover", { "message-type-button--active": this.state.activeTab === "sell" }])}>SELL MESSAGES</div>
          </div>



        
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