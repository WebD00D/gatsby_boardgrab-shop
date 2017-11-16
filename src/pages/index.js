import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import 'whatwg-fetch';


import "../layouts/css/fcss.css";
import "../layouts/css/homepage.css";


class IndexPage extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      loginLink: ''
    }
  }


  componentWillMount() {
   
   //  

   fetch('https://boardgrab-api.herokuapp.com/get-login-link?link=acct_1BNQhXBgiIHRkhRw')
   .then(function(response) {
     return response.json()
   }).then(function(json) {
     console.log('parsed json', json)
     this.setState({
       loginLink: json.url
     })
   }.bind(this)).catch(function(ex) {
     console.log('parsing failed', ex)
   })



  }

 

  render () {
    return (
      <div>
      
        <div className="homepage__hero" style={{backgroundImage: `url(${require('../layouts/images/hero2.png')})`}}>
          <div className="homepage__cta t-sans fw-500">
            Find the <span className="fc-green">best boards in {this.props.selectedRegion} </span>
            from <br /> high-performance shorties to summer time logs.
            
          </div>
        </div>
      
      </div>
    )
  }


}

const mapStateToProps = ({ userId, latitude, longitude, regions, mapZoom, citesByRegion ,boardsByCity, allBoardsList, boardsToDisplay, account_username, selectedCity, regionHasNoBoards, selectedRegion }) => {
  return { userId, latitude, longitude, regions, mapZoom, citesByRegion, boardsByCity, allBoardsList, boardsToDisplay, account_username, selectedCity, regionHasNoBoards, selectedRegion };
};

const mapDispatchToProps = dispatch => {
  return { 
    setMapPosition: (latitude, longitude) => dispatch({ type: `SET_MAP_POSITION`, latitude, longitude }),
    setCityData: (city) => dispatch({ type: `SET_CITY_DATA`, city }),
    getAllBoards: (boards) => dispatch({type: `GET_ALL_BOARDS`,boards}),
    getAllBoardsByRegion: (boards) => dispatch({ type: `GET_ALL_BOARDS_BY_REGION`, boards}),
    getAllBoardsByCity: (boards) => dispatch({ type: `GET_ALL_BOARDS_BY_CITY`, boards})
  
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
