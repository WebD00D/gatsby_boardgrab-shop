import React, {PureComponent} from 'react';
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
import "../layouts/css/site.css";

import { connect } from "react-redux";


class Authentication extends PureComponent {

  constructor(props) {
    super(props);
    this._handleSignup = this._handleSignup.bind(this);
    this._handleSignIn = this._handleSignIn.bind(this);

    this.state = {
        username: '',
        email: '',
        password: '',
        newUser: false,
        returningUser: false,
        loading: false,
    }

  }

  _handleSignIn() {
    this.setState({ loading: true })

    fire
		.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.then(function(user) {
				this.props.setCurrentUser(user.uid);
			}.bind(this))
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});

  }

  _handleSignup() {

    this.setState({
        loading: true,
        newUser: true
    })
    
    fire
		.auth()
		.createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then(function(user) {
			const newUser = fire.auth().currentUser;

            this.props.createAndSignInUser(user.uid, this.state.username);
            
            this.setState({ loading: false})
		}.bind(this))
		.catch(function(error) {
			// handle errors.
			const errorCode = error.code;
			const errorMessage = error.message;
		});

  }

  render() {

    if ( this.props.userAuthenticated && this.state.newUser ) {
            return <Redirect to="/welcome-to-boardgrab" />
    }

    if ( this.props.userAuthenticated && !this.state.newUser ) {
        return <Redirect to="/" />
}

    return (
        <div className="site-container--sm t-primary">  
        
            <div className="authentication-header">Sign in </div>
            <label className="authentication-label">Email</label>
            <input className="authentication-field" onChange={e => { this.setState({ email: e.target.value }) }} type="text" />
            <label className="authentication-label">Password</label>
            <input className="authentication-field" onChange={e => { this.setState({ password: e.target.value }) }} type="password" />
            <button onClick={()=> this._handleSignIn()} className="auth-button" style={{marginTop: '22px'}}>Sign In</button>
            <hr />
        
            <div className="authentication-header">Create Account </div>
            <label className="authentication-label">Username</label>
            <input className="authentication-field" onChange={e => { this.setState({ username: e.target.value }) }} type="text" />
            <label className="authentication-label">Email</label>
            <input className="authentication-field" onChange={e => { this.setState({ email: e.target.value }) }} type="text" />
            <label className="authentication-label">Password</label>
            <input className="authentication-field" onChange={e => { this.setState({ password: e.target.value }) }} type="password" />
            <button onClick={()=> this._handleSignup()} className="auth-button auth-button--black" style={{marginTop: '22px'}}>Submit</button>
            
        </div>
    )

  }
}


const mapStateToProps = ({ userId, userAuthenticated, account_username, firstTimeLogin }) => {
    return { userId, userAuthenticated, account_username, firstTimeLogin };
  };

  const mapDispatchToProps = dispatch => {
    return { 
      createAndSignInUser: (userId, account_username) => dispatch({ type: `CREATE_AND_SIGNIN_USER`, userId, account_username }),
      setCurrentUser: (userId) => dispatch({ type: `SET_CURRENT_USER`, userId })   
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);