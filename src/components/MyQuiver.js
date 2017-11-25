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


class MyQuiver extends PureComponent {

  constructor(props) {
      super(props);

      this.state = {
        boards: {}
      }

  }

  componentDidMount() {
    // GET ALL USERS MESSAGE PREVIEWS.
    var boardRef = fire.database().ref('/boardsByUser/' + this.props.userId );

    boardRef.on('value', function(snapshot){
      console.log('BOARD PREVIEWZZZ', snapshot.val())
      this.setState({
        boards: snapshot.val()
      })
    }.bind(this))
  }


  render() {


    const boards = this.state.boards;
    const boardList = [];
    let boardListReversed;



    _.forEach(boards, function(value, key) {

        console.log(key,value)

        boardList.push(
          <div key={key} style={{textDecoration: 'none', justifyContent: 'space-between'}} className={cx([ "table-row" ])} >
          <div style={{paddingLeft: '8px'}} className={cx(["t-sans f-11 ls-2 w-40p fc-green"])}>
            {value.name} <br />
            <span style={{color: '#404040', fontSize: '9px'}}>Listed on <Moment format="MM/DD/YYYY @ hh:mm A" date={value.listDate} /></span>
          </div>
          <div style={{paddingRight: '8px'}}>
            { value.sold ? <div className="f-13 fc-green t-sans">Sold for ${ value.amountSoldFor / 100 }! </div> : <Link className="f-13 fc-green t-sans" to="/"> <i className="fa fa-pencil"></i> Edit Listing</Link> }
          </div>
         
        </div>
        )


    }.bind(this));

    boardListReversed = _.reverse(boardList);
 

    return (
        <div>
          <div>
             <div className="table-rows">
              {
                boardList.length > 0
                ? <div>{boardListReversed}</div>
                : <div className='t-sans f-13 t-center'>0 Boards Found</div>
              }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyQuiver);
