import React, {PureComponent} from 'react';
import Link from 'gatsby-link'
import cx from "classnames";
import fire from "../fire";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from 'react-moment';
import 'moment-timezone';

import "../layouts/css/login.css";
import "../layouts/css/listing.css";
import "../layouts/css/tables.css";
import "../layouts/css/fcss.css";
import "../layouts/css/button.css";

class OffersReceived extends PureComponent {

  constructor(props) {
      super(props);

      this.state = {
        offersReceived: {}
      }

  }

  componentDidMount() {
    // GET ALL THE SELLERS OFFERS PER BOARD... 
    var messageRef = fire.database().ref('/users/' + this.props.userId + '/offersReceived');

    messageRef.on('value', function(snapshot){
    
      this.setState({
        offersReceived: snapshot.val()
      })
    }.bind(this))
  }



  render() {


    const offersReceivedDataSource = this.state.offersReceived;
    const offersReceivedList = [];
  
    _.forEach(offersReceivedDataSource, function(value, key) {

            console.log('OFFERS RECEIVED LIST',  value);

            // offersReceivedList.push(
            //                 <div key={key}>
            //                     <div style={{ paddingLeft: '8px' }} className={cx([
            //                             't-sans f-11 ls-2 w-40p fc-green',
            //                             { 'fc-white': !value.read }
            //                         ])}>
            //                         {value.boardName}
            //                     </div>
            //                     <div
            //                         className={cx([
            //                             't-sans f-11 ls-2 w-40p fc-green',
            //                             { 'fc-white': !value.read }
            //                         ])}
            //                     >
            //                         {value.lastMessage.substr(0, 30)}...
            //                     </div>
            //                     <div className={cx([
            //                             't-sans f-11  fw-500 ls-2 w-20p t-right fx fx-col fc-green',
            //                             { 'fc-white': !value.read }
            //                         ])} style={{ paddingRight: '8px' }}>
            //                         <div>{value.buyerUser}</div>
            //                         <div>
            //                             <Moment format="MM/DD/YYYY HH:mm A" date={value.lastMessageDate} />
            //                         </div>
            //                     </div>
            //                 </div>
            //             );
		}.bind(this));

	return (<div>
			<div className="table-rows">
            Testing
				{/* {offersReceivedList.length > 0 ? (
					<div>{offersReceivedList}</div>
				) : (
					<div className="t-sans f-13 t-center">0 Offers Received</div>
				)} */}
			</div>
            </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(OffersReceived);
