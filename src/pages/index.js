import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginForm from "../components/LoginForm";

class IndexPage extends PureComponent {

  render() {

    if ( this.props.userId ) {
      return (
        <Redirect to="/inventory" />
      )
    }

    return (
      <div>
        {this.props.userId}
        <LoginForm />
      </div>
    )
  }
}


const mapStateToProps = ({ userId }) => {
  return { userId };
};
export default connect(mapStateToProps)(IndexPage)
