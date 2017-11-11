import React, {PureComponent} from 'react';
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import "../layouts/css/site.css";
import "../layouts/css/board.css";
import "../layouts/css/fcss.css";
import { connect } from "react-redux";

import Disqus from "../components/Disqus";


class BoardDetail extends PureComponent {

  constructor(props) {
    super(props);
    
    this.state = {
        boardId: '',
        board: {},
    }
  }



  componentDidMount() {

  // get board param id
  const id = this.getQueryVariable("board")

    fire.database().ref(`/allBoardsList/boards/${id}`).once('value').then(function(snapshot){
       console.log("SNAPSHOT", snapshot.val())
      this.setState({
        boardId: id,
        board: snapshot.val()
      })
    }.bind(this))

  }

  getQueryVariable(variable) {
         var query = window.location.search.substring(1);
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
  }

  
  render () {
   // design based off of
    //https://www.airbnb.com/experiences/47240?source=p1&currentTab=all_tab&searchId=ed3e2277-d279-4e93-91e7-af3bb068f8f0


    // When User "Reserves" - we will capture charge, but not actually process until seller confirms.

    return (
      <div className="site-container">

        <div className="board-info">

        <div className="board-info__column__sm">
            <img style={{borderRadius: '4px'}} src={this.state.board.featurePhotoURL} />

            <div className="board-info__images">
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
              <div className="board-info__image" style={{backgroundImage: 'url('+ this.state.board.photoOne +')'}}></div>
            </div>

          </div>  

          <div className="board-info__column__lg" style={{paddingLeft: '40px'}}>
            <div className="board-info__header">
              <div className="board-info__title">{this.state.board.name}</div>
              <div className="board-info__location"><span>{this.state.board.city}, </span><span>{this.state.board.region}</span></div>
              <div className="board-info__short-desc">Lorem ipsum dolar set amit. Water tight and ready to rip!</div>
              
            </div>

            <div className="board-info__price" style={{borderBottom: 'none', marginBottom: '0px'}}>
              <div style={{fontSize: '28px'}} className="fc-green">${this.state.board.price}</div>
              <button>Make an Offer</button>
            </div>

            <div className="board-info__tags" style={{marginTop: '0px'}}>
              <label>Perfect For: </label>
              {this.state.board.tag_advanced ? <div className="board-info__tag">Advanced Rider</div>: '' }
              {this.state.board.tag_beginner ? <div className="board-info__tag">Beginners</div>: '' }
              {this.state.board.tag_greatforanybody ? <div className="board-info__tag">Anybody</div>: '' }
              {this.state.board.tag_intermediate ? <div className="board-info__tag">Intermediate Rider</div>: '' }
              {!this.state.board.tag_budget ? <div className="board-info__tag">On a Budget</div>: '' }
              {this.state.board.tag_smallwaves ? <div className="board-info__tag">Small Waves</div>: '' }
            </div>


            <div className="board-info__section">
              <div className="board-info__section-row t-sans f-16">
                <i className="fa fa-leaf"></i>
                <span style={{marginLeft: '14px'}} className="fc-green">Shortboard</span>
              </div>
              <div className="board-info__section-row t-sans f-16">
                <i className="fa fa-leaf"></i>
                <span style={{marginLeft: '14px'}} className="fc-green">{this.state.board.dimensions}</span>
              </div>
              <div className="board-info__section-row t-sans f-16">
                <i className="fa fa-leaf"></i>
                <span style={{marginLeft: '14px'}} className="fc-green">{this.state.board.fins}-Fin</span>
              </div>
            </div>


            <div className="board-info__section b-top-solid p-t-18">
              <div className="board-info__section-row t-sans f-16 fx-a-end">
                <div className="about-seller">About the seller, <br/> Bailey</div>
                <span style={{marginLeft: '14px'}} >
                Bailey has grown up and lived in Venice Beach all his life, surfing most if not every day.
                Favorite board is a GH, and favorite surfer (for obvious reasons) is Jordy Smith.
                </span>
              </div>
            </div>

            <div className="board-info__section b-top-solid p-t-18">
              <div className="board-info__section-row t-sans f-16 fx-a-end">
                <div className="about-seller">Details</div>
                <span style={{marginLeft: '14px'}} >
                 Shaped by the one and only Jon Pyzel. 2 year repeat winner of Stab in the Dark, and
                 lorem ipsum dolar set amit.
                </span>
              </div>
            </div>

            <div className="board-info__section b-top-solid p-t-18">
              <div className="board-info__section-row t-sans f-16 fx-a-end">
                <div className="about-seller">Condition</div>
                <span style={{marginLeft: '14px'}} >
                 Shaped by the one and only Jon Pyzel. 2 year repeat winner of Stab in the Dark, and
                 lorem ipsum dolar set amit.
                </span>
              </div>
            </div>

            <div className="board-info__section b-top-solid p-t-18">
              <div className="board-info__section-row t-sans f-16 fx-a-end">
                <div className="about-seller">Shaper Info</div>
                <span style={{marginLeft: '14px'}} >
                 Shaped by the one and only Jon Pyzel. 2 year repeat winner of Stab in the Dark, and
                 lorem ipsum dolar set amit.
                </span>
              </div>
            </div>
            
          </div>

          

          


        </div>
  
        <Disqus title="Board Comments" shortname="boardgrab-comments" identifier={this.state.boardId} />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);