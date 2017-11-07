import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import _ from "lodash";

import { connect } from "react-redux";

import CityPin from "../components/CityPin";
import Board from "../components/Board";

import "../layouts/css/filters.css";
import "../layouts/css/fcss.css";

import CITIES from "../data/cities.json";

class IndexPage extends PureComponent {

  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this);
    this._updateDims = this._updateDims.bind(this);

    this.state = {
      popupInfo: null,
      width: 0,
      height: 0,
    };
  }


  componentWillMount() {
   
  }

  componentDidMount() {
    this._updateDims()
    window.addEventListener("resize", this._updateDims);
    

    // GET ALL BOARDS
    fire.database().ref("/allBoardsList/boards").once('value').then(function(snapshot){
			console.log("BOARDS", snapshot.val())
			this.props.getAllBoards(snapshot.val())
    }.bind(this))
    
    // GET ALL BOARDS BY REGION
    fire.database().ref("/boardsByRegion/").once('value').then(function(snapshot){
			console.log("BOARDS BY REGION", snapshot.val())
			this.props.getAllBoardsByRegion(snapshot.val())
    }.bind(this))
    
    // GET ALL BOARDS BY CITY
    fire.database().ref("/boardsByCity/").once('value').then(function(snapshot){
			console.log("BOARDS BY CITY", snapshot.val())
			this.props.getAllBoardsByCity(snapshot.val())
    }.bind(this))

    
  }

  _updateDims() {
    const containerWidth = document.getElementById("map").clientWidth;
    this.setState({
      width: containerWidth,
      height: window.innerHeight
    })
  }

  _renderBoards = (board, index) => {
    return (
      <Board key={`boards-${index}`} board={board} onClick={()=> alert(`view info for board id ${board.id}`)} />
    )
  }
  
  _renderCityMarker = (city, index) => {
    console.log(city,index)
    return;
      return (
        <Marker key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <CityPin size={20} boardCount={city.boards.length} onClick={()=> this.handleCityChange(city.name)}/>
        </Marker>
      );
  }

  handleCityChange(city) {
    this.props.setCityData(city);
  }

	render() {

    let boards;

    if ( !this.props.boardsToDisplay ) {
      boards = <div className="t-sans">No boards found! Be the first to <Link className="fc-green" to="/list-a-board">list a board for {this.props.selectedCity}</Link></div>
    } else {
      boards = Object.keys(this.props.boardsToDisplay).map(function(key) {
        console.log(key)
        return <Board key={`boards-${Number(key)}`} board={this.props.boardsToDisplay[key]} onClick={()=> alert(`view info for board id ${key}`)} /> 
      }.bind(this));
    }


     let boardsByCity = Object.keys(this.props.boardsByCity).map(function(key){
      return  (
        <Marker key={`marker-${key}`}
        longitude={this.props.boardsByCity[key].longitude}
        latitude={this.props.boardsByCity[key].latitude} >
        <CityPin size={20} boardCount={_.size(this.props.boardsByCity[key].boards)} onClick={()=> this.handleCityChange(key)}/>
      </Marker>
      )
    }.bind(this))

 

    
   
		return (
			<div id="container" style={{display: 'flex'}}>

      {this.props.account_username}
      
        <div id="boards" style={{width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>

          <div style={{
              height: '40px', width: '70%', position: 'fixed', top: '100px' ,backgroundColor: '#FFFFFF',borderBottom: '1px solid #f5f5f5' ,zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
             
            <div style={{paddingLeft: '30px', paddingRight: '30px', width: '100%', display: 'flex' }}>
              <div className="filter__text">Best for <img src={require('../layouts/images/dropdownarrow.png')} /></div>
              <div className="filter__text">Fin Setup <img src={require('../layouts/images/dropdownarrow.png')} /></div>
              <div className="filter__text">Length <img src={require('../layouts/images/dropdownarrow.png')} /></div>
              <div className="filter__text">Width <img src={require('../layouts/images/dropdownarrow.png')} /></div>
              <div className="filter__text">Thickness <img src={require('../layouts/images/dropdownarrow.png')} /></div>
              <div className="filter__text">Volume <img src={require('../layouts/images/dropdownarrow.png')} /></div>
            </div>

          </div>

          <div style={{width: '100%', paddingLeft: '30px', paddingRight: '30px', display: 'flex', flexWrap: 'wrap'}}>
            {boards}
          </div>
          
        </div>
        <div id="map" style={{width: '30%', position: 'fixed', top: '100px', bottom: 0, right: 0}}>
        <MapGL
					mapboxApiAccessToken={
						'pk.eyJ1Ijoid2ViZG9vZCIsImEiOiJjajlnZTk0OTMyeGVhMndwOWJ4bDlqMDd1In0.TzYbLbUFco-TSaqObrvWTA'
					}
					width={this.state.width}
					height={this.state.height}
					latitude={this.props.latitude}
					longitude={this.props.longitude}
					zoom={this.props.mapZoom}
          mapStyle='mapbox://styles/webdood/cj9gc6pvx8udn2ro4lyqrxuo6'
					onViewportChange={viewport => {
						const { width, height, latitude, longitude, zoom } = viewport;
            this.props.setMapPosition(latitude,longitude)
					}}
				>

        {boardsByCity}
      
        </MapGL>
        </div>

			</div>
		);
	}
}

const mapStateToProps = ({ userId, latitude, longitude, regions, mapZoom, citesByRegion ,boardsByCity, allBoardsList, boardsToDisplay, account_username, selectedCity }) => {
  return { userId, latitude, longitude, regions, mapZoom, citesByRegion, boardsByCity, allBoardsList, boardsToDisplay, account_username, selectedCity };
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
