import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import { Route, Redirect } from "react-router-dom";
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

import { connect } from "react-redux";

import CityPin from "../components/CityPin";

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

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} boardCount={150} onClick={()=> this.handleCityChange(city.name)}/>
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

        <div id="boards" style={{width: '70%'}}>
          Boards {this.props.userId}
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
        { CITIES.map(this._renderCityMarker) }
      
        </MapGL>
        </div>

			</div>
		);
	}
}




const mapStateToProps = ({ userId, latitude, longitude, regions, mapZoom }) => {
  return { userId, latitude, longitude, regions, mapZoom };
};

const mapDispatchToProps = dispatch => {
  return { 
    setMapPosition: (latitude, longitude) => dispatch({ type: `SET_MAP_POSITION`, latitude, longitude }),
    setCityData: (city) => dispatch({ type: `SET_CITY_DATA`, city })
  
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
