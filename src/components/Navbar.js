import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Link from "gatsby-link";
import cx from "classnames";

import fire from '../fire';

import "../layouts/css/navbar.css";
import "../layouts/css/fcss.css";

class Navbar extends PureComponent {

  constructor(props) {
    super(props);

    this.handleLocationDropDown = this.handleLocationDropDown.bind(this);

    this.state = {
      locationSelectorOpen: false
    }

  }

  handleLocationDropDown() {
    
    this.setState({
      locationSelectorOpen: !this.state.locationSelectorOpen
    })

  }

  render(){

    const shopUser = this.props.userId ? <span className="navbar__logo-title td-none fc-green">Welcome, {this.props.shop_name} | <a href="#" onClick={this.props.signOutUser} className="navbar__logo-title td-none">Logout</a></span> : '';

    return (
      <div className="navbar__wrapper">
      <div className="navbar">
        <div className="navbar__logo-wrap">
          <img className="navbar__logo" src={require("../layouts/images/bg-logo-color.svg")} />
          <div className="navbar__logo__divider"></div>
          <div className="navbar__location-selector" onClick={this.handleLocationDropDown}>
            <div className="navbar__location">Southern California</div>
            <img src={require("../layouts/images/dropdownarrow.png")} />

            <div className={cx(["navbar__location__dropdown"], {"d-none": !this.state.locationSelectorOpen} )}>
              <div className="navbar__location__dropdown__header">Boardgrab Locations</div>
              <div className="navbar__location__dropdown__item">All locations</div>
              <div className="navbar__location__dropdown__item">Southern California</div>
              <div className="navbar__location__dropdown__item">Northern California</div>
              <div className="navbar__location__dropdown__item">Mid-Atlantic</div>
              <div className="navbar__location__dropdown__item">South East</div>
              <div className="navbar__location__dropdown__item">East Florida</div>
              <div className="navbar__location__dropdown__item">West Florida</div>
              <div className="navbar__location__dropdown__item">Hawaii</div>
              <div className="navbar__location__dropdown__item">Melbourne</div>
              <div className="navbar__location__dropdown__item">Sydney</div>
              <div className="navbar__location__dropdown__item navbar__location__dropdown__item--no-border">Cape Town</div>
            </div>

          </div>
        </div>
        <div>
          <Link className="navbar__link" to="/">Start Earning with Boardgrab</Link>
          <Link className="navbar__link" to="/">Sign in / Sign up</Link>
        </div>
      </div>
      <div className="navbar__subnav ">
        <div className="navbar__subnav--left navbar_subnav__section">
          <Link className="navbar__subnav__link" to="/">Who we are</Link>
          <Link className="navbar__subnav__link" to="/">Blog</Link>
          <Link className="navbar__subnav__link" to="/">Reviews</Link>
        </div>
        <div className="navbar__subnav--right navbar_subnav__section">
          <Link className="navbar__subnav__link" to="/">Shorties</Link>
          <Link className="navbar__subnav__link" to="/">Fun</Link>
          <Link className="navbar__subnav__link" to="/">Logs</Link>
          <Link className="navbar__subnav__link" to="/">Fins</Link>
          <Link className="navbar__subnav__link" to="/">Suits</Link>
        </div>
      </div>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return { signOutUser: () => dispatch({ type: `LOGOUT_USER` }) }
}

const mapStateToProps = ({ count, userId, shop_name }) => {
  return { count, userId, shop_name }
}

export default connect(mapStateToProps, mapDispatchToProps )(Navbar)
