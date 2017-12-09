import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Link from "gatsby-link";
import cx from "classnames";
import _ from "lodash";
import fire from "../fire";

import "../layouts/css/navbar.css";
import "../layouts/css/fcss.css";

class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLocationDropDown = this.handleLocationDropDown.bind(this);
    this.handleSubLocationDropDown = this.handleSubLocationDropDown.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);

    this.state = {
      locationSelectorOpen: false,
      subLocationSelectorOpen: false
    };
  }

  handleLocationDropDown() {
    this.setState({
      locationSelectorOpen: !this.state.locationSelectorOpen
    });
  }

  handleSubLocationDropDown() {
    this.setState({
      subLocationSelectorOpen: !this.state.subLocationSelectorOpen
    });
  }

  handleRegionChange(region) {
    // https://www.findlatitudeandlongitude.com/?loc=southern+california#.WfmzKBOPI6g
    this.props.setRegionData(region);
  }

  handleCityChange(city) {
    this.props.setCityData(city);
  }

  render() {
    const cities = this.props.currentCityList.map((city, key) => (
      <div
        key={key}
        onClick={() => this.handleCityChange(city.name)}
        className="navbar__location__dropdown__item"
      >
        {city.name}
      </div>
    ));

    const shopUser = this.props.userId ? (
      <span className="navbar__logo-title td-none fc-green">
        Welcome, {this.props.shop_name} |{" "}
        <a
          href="#"
          onClick={this.props.signOutUser}
          className="navbar__logo-title td-none"
        >
          Logout
        </a>
      </span>
    ) : (
      ""
    );

    return;
    <div className="navbar__wrapper">
      <div className="navbar">
        <div className="navbar__logo-wrap">
          <Link to="/">
            <img
              className="navbar__logo"
              src={require("../layouts/images/bg-logo-color.svg")}
            />
          </Link>
          <div className="navbar__logo__divider" />
          <div
            className="navbar__location-selector"
            onClick={this.handleLocationDropDown}
          >
            <div className="navbar__location">{this.props.selectedRegion}</div>
            <img src={require("../layouts/images/dropdownarrow.png")} />

            <div
              className={cx(["navbar__location__dropdown"], {
                "d-none": !this.state.locationSelectorOpen
              })}
            >
              <div className="navbar__location__dropdown__header">
                Boardgrab Locations
              </div>
              <div
                onClick={() => this.handleRegionChange("All Locations")}
                className="navbar__location__dropdown__item"
              >
                All locations
              </div>
              <div
                onClick={() => this.handleRegionChange("Southern California")}
                className="navbar__location__dropdown__item"
              >
                Southern California
              </div>
              <div
                onClick={() => this.handleRegionChange("Northern California")}
                className="navbar__location__dropdown__item"
              >
                Northern California
              </div>
              <div
                onClick={() => this.handleRegionChange("Pacific North West")}
                className="navbar__location__dropdown__item"
              >
                Pacific North West
              </div>
              <div
                onClick={() => this.handleRegionChange("Mid Atlantic")}
                className="navbar__location__dropdown__item"
              >
                Mid-Atlantic
              </div>
              <div
                onClick={() => this.handleRegionChange("South East")}
                className="navbar__location__dropdown__item"
              >
                South East
              </div>
              <div
                onClick={() => this.handleRegionChange("East Florida")}
                className="navbar__location__dropdown__item"
              >
                East Florida
              </div>
              <div
                onClick={() => this.handleRegionChange("Hawaii")}
                className="navbar__location__dropdown__item"
              >
                Hawaii
              </div>
              <div
                onClick={() => this.handleRegionChange("Australia")}
                className="navbar__location__dropdown__item"
              >
                Australia
              </div>
              <div
                onClick={() => this.handleRegionChange("South Africa")}
                className="navbar__location__dropdown__item navbar__location__dropdown__item--no-border"
              >
                South Africa
              </div>
            </div>
          </div>
          <div
            className={cx([
              "navbar__location-selector",
              { "d-none": this.props.selectedRegion === "All Locations" }
            ])}
            style={{ marginLeft: "30px" }}
            onClick={this.handleSubLocationDropDown}
          >
            <div className="navbar__location">{this.props.selectedCity}</div>
            <img src={require("../layouts/images/dropdownarrow.png")} />

            <div
              className={cx(["navbar__location__dropdown"], {
                "d-none": !this.state.subLocationSelectorOpen
              })}
            >
              <div className="navbar__location__dropdown__header">Cities</div>

              {cities}
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {this.props.userAuthenticated && this.props.isSeller ? (
            <Link className="navbar__link hover" to="/list-a-board">
              List a Board
            </Link>
          ) : (
            ""
          )}
          {this.props.userAuthenticated && !this.props.isSeller ? (
            <Link className="navbar__link" to="/sell-with-us">
              Start Selling
            </Link>
          ) : (
            ""
          )}
          {this.props.userAuthenticated ? (
            <Link className="navbar__link hover" to="/account">
              My Account{" "}
              {this.props.hasNotifications ? (
                <i className="fa fa-bell fc-red" />
              ) : (
                ""
              )}{" "}
            </Link>
          ) : (
            ""
          )}

          {this.props.userAuthenticated ? (
            <div
              onClick={this.props.signOutUser}
              className="navbar__link hover"
            >
              Signout
            </div>
          ) : (
            <Link className="navbar__link " to="/authentication">
              Login / Register
            </Link>
          )}
        </div>
      </div>
      <div className="navbar__subnav ">
        <div className="navbar__subnav--left navbar_subnav__section">
          <Link className="navbar__subnav__link" to="/buy-boards">
            Shop
          </Link>
          <Link className="navbar__subnav__link" to="/about">
            Who we are
          </Link>
          <Link className="navbar__subnav__link" to="/faqs">
            Faqs
          </Link>
          <a
            className="navbar__subnav__link"
            target="_blank"
            href="https://medium.com/boardgrab"
          >
            Blog
          </a>
        </div>
      </div>
    </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch({ type: `LOGOUT_USER` }),
    setRegionData: region =>
      dispatch({ type: `SET_REGION_AND_CITIES`, region }),
    setCityData: city => dispatch({ type: `SET_CITY_DATA`, city })
  };
};

const mapStateToProps = ({
  count,
  userId,
  shop_name,
  regions,
  citesByRegion,
  selectedRegion,
  currentCityList,
  selectedCity,
  userAuthenticated,
  account_username,
  isSeller,
  hasNotifications
}) => {
  return {
    count,
    userId,
    shop_name,
    regions,
    citesByRegion,
    selectedRegion,
    currentCityList,
    selectedCity,
    userAuthenticated,
    account_username,
    isSeller,
    hasNotifications
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
