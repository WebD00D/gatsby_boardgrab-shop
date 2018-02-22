import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import cx from "classnames";
import _ from "lodash";

import { connect } from "react-redux";

import CityPin from "../components/CityPin";
import Board from "../components/Board";
import BoardFlyout from "../components/BoardFlyOut";

import "../layouts/css/filters.css";
import "../layouts/css/site.css";
import "../layouts/css/fcss.css";
import "../layouts/css/board.css";

import CITIES from "../data/cities.json";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this);
    this._updateDims = this._updateDims.bind(this);
    this._handleBoardClick = this._handleBoardClick.bind(this);

    this.state = {
      popupInfo: null,
      width: 0,
      height: 0,
      flyout: false,
      board: 0,
      bestForMenuOpen: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this._updateDims();
    window.addEventListener("resize", this._updateDims);

    // GET ALL BOARDS
    fire
      .database()
      .ref("/allBoardsList/boards")
      .once("value")
      .then(
        function(snapshot) {
          console.log("BOARDS", snapshot.val());
          this.props.getAllBoards(snapshot.val());
        }.bind(this)
      );

    // GET ALL BOARDS BY REGION
    fire
      .database()
      .ref("/boardsByRegion/")
      .once("value")
      .then(
        function(snapshot) {
          console.log("BOARDS BY REGION", snapshot.val());
          this.props.getAllBoardsByRegion(snapshot.val());
        }.bind(this)
      );

    // GET ALL BOARDS BY CITY
    fire
      .database()
      .ref("/boardsByCity/")
      .once("value")
      .then(
        function(snapshot) {
          console.log("BOARDS BY CITY", snapshot.val());
          this.props.getAllBoardsByCity(snapshot.val());
        }.bind(this)
      );
  }

  _updateDims() {
    if (document.getElementById("map")) {
      const containerWidth = document.getElementById("map").clientWidth;
      this.setState({
        width: containerWidth,
        height: window.innerHeight
      });
    }
  }

  _renderBoards = (board, index) => {
    return (
      <Board
        key={`boards-${index}`}
        board={board}
        onClick={() => {
          this.setState({
            flyout: true,
            board: board.id
          });
        }}
      />
    );
  };

  _renderCityMarker = (city, index) => {
    console.log(city, index);
    return;
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <CityPin
          size={20}
          boardCount={city.boards.length}
          onClick={() => this.handleCityChange(city.name)}
        />
      </Marker>
    );
  };

  handleCityChange(city) {
    this.props.setCityData(city);
  }

  _handleBoardClick(board) {
    console.log("HANDLE BOARD", board);
    this.setState({
      board: board,
      flyout: true
    });
  }

  render() {
    let boards;

    if (!this.props.boardsToDisplay || this.props.boardsToDisplay.length == 0) {
      if (!this.props.boardsToDisplay) {
        boards = (
          <div className="t-sans" style={{minHeight: '300px', paddingBottom: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{marginBottom: '13px'}}><b>No Boards Found!</b></div>
            <div style={{marginBottom: '13px'}}>Why not be the first to sell?</div>
            { this.props.isSeller ? <Link className="auth-button" to="/sell-a-board">list a board</Link> : '' }
            { this.props.userAuthenticated && !this.props.isSeller ? <Link className="auth-button" to="/sell-with-us">Start selling</Link> : '' }
            { !this.props.userAuthenticated ? <Link className="auth-button" to="/authentication">Create Account</Link> : '' }
          </div>
        );
      } else {
        boards = (
          <div className="t-sans" style={{minHeight: '300px', paddingBottom: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{marginBottom: '13px'}}><b>No Boards Found!</b></div>
            <div style={{marginBottom: '13px'}}>Why not be the first to sell?</div>
            { this.props.isSeller ? <Link className="auth-button" to="/sell-a-board">list a board</Link> : '' }
            { this.props.userAuthenticated && !this.props.isSeller ? <Link className="auth-button" to="/sell-with-us">Start selling</Link> : '' }
            { !this.props.userAuthenticated ? <Link className="auth-button" to="/authentication">Create Account</Link> : '' }
          </div>
        );
      }
    } else {
      boards = Object.keys(this.props.boardsToDisplay).map(
        function(key) {
          return (
            <Link
              key={key}
              style={{ textDecoration: "none", color: "#404040" }}
              to={`/board-detail/?board=${key}`}
            >
              <Board
                key={`boards-${Number(key)}`}
                board={this.props.boardsToDisplay[key]}
              />{" "}
            </Link>
          );
        }.bind(this)
      );
    }

    let boardsByCity;
    if ( this.props.boardsByCity ) {
       boardsByCity = Object.keys(this.props.boardsByCity).map(
        function(key) {
          const size = _.size(this.props.boardsByCity[key].boards);

          if (size == 0) {
            return;
          }

          return (
            <Marker
              key={`marker-${key}`}
              longitude={this.props.boardsByCity[key].longitude}
              latitude={this.props.boardsByCity[key].latitude}
            >
              <CityPin
                size={20}
                boardCount={_.size(this.props.boardsByCity[key].boards)}
                onClick={() => this.handleCityChange(key)}
              />
            </Marker>
          );
        }.bind(this)
      );
    }



    return (
      <div id="container" style={{ display: "flex" }}>
        <div id="boards" className="boards-page-container">
          <div className="ad-container">
            <a target="_blank" href="https://us.billabong.com/shop/mens-boardshorts">
              <img
                className="ad"
                src="https://us.billabong.com/media/transfer/img/lbib_unplug_hp_banner.jpg"
              />
            </a>
          </div>

          <div className="boards-pages-secondary-container">
            {_.reverse(boards)}
          </div>

          <div className="ad-container">
            <a target="_blank"  href="https://futuresfins.com/freestone-control.html">
              <img
                className="ad"
                src="https://futuresfins.com/wp/wp-content/uploads/2016/05/Homepage_Freestone_Con_1520X700.jpg"
              />
            </a>
          </div>
        </div>
        <div
          id="map"
          className="board-map"
          style={{
            width: "40%",
            position: "fixed",
            top: "100px",
            bottom: 0,
            right: 0
          }}
        >
          <MapGL
            mapboxApiAccessToken={
              "pk.eyJ1Ijoid2ViZG9vZCIsImEiOiJjajlnZTk0OTMyeGVhMndwOWJ4bDlqMDd1In0.TzYbLbUFco-TSaqObrvWTA"
            }
            width={this.state.width}
            height={this.state.height}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            zoom={this.props.mapZoom}
            mapStyle="mapbox://styles/webdood/cj9gc6pvx8udn2ro4lyqrxuo6"
            onViewportChange={viewport => {
              const { width, height, latitude, longitude, zoom } = viewport;
              this.props.setMapPosition(latitude, longitude);
            }}
          >
            {boardsByCity}
          </MapGL>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  userId,
  latitude,
  longitude,
  regions,
  mapZoom,
  citesByRegion,
  boardsByCity,
  allBoardsList,
  boardsToDisplay,
  account_username,
  selectedCity,
  regionHasNoBoards,
  selectedRegion,
  isSeller,
  userAuthenticated
}) => {
  return {
    userId,
    latitude,
    longitude,
    regions,
    mapZoom,
    citesByRegion,
    boardsByCity,
    allBoardsList,
    boardsToDisplay,
    account_username,
    selectedCity,
    regionHasNoBoards,
    selectedRegion,
    isSeller,
    userAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMapPosition: (latitude, longitude) =>
      dispatch({ type: `SET_MAP_POSITION`, latitude, longitude }),
    setCityData: city => dispatch({ type: `SET_CITY_DATA`, city }),
    getAllBoards: boards => dispatch({ type: `GET_ALL_BOARDS`, boards }),
    getAllBoardsByRegion: boards =>
      dispatch({ type: `GET_ALL_BOARDS_BY_REGION`, boards }),
    getAllBoardsByCity: boards =>
      dispatch({ type: `GET_ALL_BOARDS_BY_CITY`, boards })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
