import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";



class IndexPage extends PureComponent {

  render() { 
    return (
      <div>
      
      Homepage
      
      </div>
    )
  }
}




const mapStateToProps = ({ userId }) => {
  return { userId };
};
export default connect(mapStateToProps)(IndexPage)
