import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import { Route, Redirect } from "react-router-dom";
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

import { connect } from "react-redux";

import CityPin from "../components/CityPin";
import Board from "../components/Board";

import "../layouts/css/filters.css";

import CITIES from "../data/cities.json";

class IndexPage extends PureComponent {

  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this);

    this.state = {
      popupInfo: null,
      width: 0,
      height: 0,
    };
  }


  _renderBoards = (board, index) => {
    return (

      <Board key={`boards-${index}`} board={board} onClick={()=> alert(`view info for board id ${board.id}`)} />

    )
  }
  

  _renderCityMarker = (city, index) => {

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

  componentDidMount() {
    const containerWidth = document.getElementById("map").clientWidth;

    this.setState({
      width: containerWidth,
      height: window.innerHeight
    })
  }

	render() {
		return (
			<div id="container" style={{display: 'flex'}}>

        <div id="boards" style={{width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>

          <div style={{
              height: '40px', width: '70%', position: 'fixed', top: '100px' ,backgroundColor: '#FFFFFF',borderBottom: '1px solid #f5f5f5' ,zIndex: 3, display: 'flex', alignItems: 'center'
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

          <div style={{width: '100%', paddingLeft: '30px', paddingRight: '30px'}}>
          { this.props.boardsToDisplay ? this.props.boardsToDisplay.map(this._renderBoards): 'NO BOARDS FOUND!' }
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
        {/* { CITIES.map(this._renderCityMarker) } */}

        {  this.props.boardsByCity.map(this._renderCityMarker)}
      
        </MapGL>
        </div>

			</div>
		);
	}
}

const mapStateToProps = ({ userId, latitude, longitude, regions, mapZoom, citesByRegion ,boardsByCity, allBoardsList, boardsToDisplay }) => {
  return { userId, latitude, longitude, regions, mapZoom, citesByRegion, boardsByCity, allBoardsList, boardsToDisplay };
};

const mapDispatchToProps = dispatch => {
  return { 
    setMapPosition: (latitude, longitude) => dispatch({ type: `SET_MAP_POSITION`, latitude, longitude }),
    setCityData: (city) => dispatch({ type: `SET_CITY_DATA`, city })
  
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
