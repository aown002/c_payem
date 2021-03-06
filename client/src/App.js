import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignIn from './components/SignIn'
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import Routes from './Routes';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from './actions';

const App = (props) => {
 // if (props.auth.authentication.loggedIn === false) return <Redirect to='/signin' />
  return (
    <Router>
      <div className="App wrapper">
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route path="/" component={Routes} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  let alert = state.alertReducer
  let auth = state.authReducer
  return {
    alert,
    auth
  }
}

export default connect(mapStateToProps, { ...authActions })(App)