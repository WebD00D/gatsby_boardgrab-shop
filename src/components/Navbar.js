import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import fire from '../fire';

import "../layouts/css/navbar.css";
import "../layouts/css/fcss.css";

class Navbar extends PureComponent {

  constructor(props) {
    super(props);
    console.log(props)

  }


  render(){


    const shopUser = this.props.userId ? <span className="navbar__logo-title td-none fc-green">Welcome, {this.props.shop_name} | <a href="#" onClick={this.props.signOutUser} className="navbar__logo-title td-none">Logout</a></span> : '';

    return (
      <div className="navbar">

        <div className="navbar__logo-wrap">
          <div className="navbar__logo">
            <img src={require("../layouts/images/bg-mono.png")} />
          </div>
          <div className="navbar__logo-title">Shop Dashboard</div>
        </div>

        <div>
          {shopUser}

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
