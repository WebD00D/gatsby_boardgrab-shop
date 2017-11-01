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
    this.state = {
      latitude: 34.0522,
      longitude: -118.2437,
      popupInfo: null
    };
  }

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} boardCount={150} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  }

	render() {
		return (
			<div>
				Testing
				<MapGL
					mapboxApiAccessToken={
						'pk.eyJ1Ijoid2ViZG9vZCIsImEiOiJjajlnZTk0OTMyeGVhMndwOWJ4bDlqMDd1In0.TzYbLbUFco-TSaqObrvWTA'
					}
					width={600}
					height={400}
					latitude={this.state.latitude}
					longitude={this.state.longitude}
					zoom={8}
          mapStyle='mapbox://styles/mapbox/streets-v9'
					onViewportChange={viewport => {
						const { width, height, latitude, longitude, zoom } = viewport;
						// Optionally call `setState` and use the state to update the map.
            console.log(viewport);
            this.setState({
              latitude,
              longitude
            })
					}}

				>

    { CITIES.map(this._renderCityMarker) }
        
        </MapGL>
			</div>
		);
	}
}




const mapStateToProps = ({ userId }) => {
  return { userId };
};
export default connect(mapStateToProps)(IndexPage)
