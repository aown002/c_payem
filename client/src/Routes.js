import React, { useState } from 'react';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from './actions';

const Routes = (props) => {

  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)

  if (props.auth.authentication.loggedIn === false) return <Redirect to='/signin' />
  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggle} isOpen={isOpen} />
        <Content toggle={toggle} isOpen={isOpen} />
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

export default connect(mapStateToProps, { ...authActions })(Routes)