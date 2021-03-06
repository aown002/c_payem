import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import logo from '../assets/payem_logo.svg';
import { Container, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmailIcon from '@material-ui/icons/Email';
import { connect } from 'react-redux';
import { authActions } from '../actions';
import { Redirect } from 'react-router-dom'

const classes = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

window.loggedIn = false

class SignIn extends Component {

  state = {
    user: {
      email: '',
      password: '',
    },
    error: null,
  }

  handleTextChange = (event) => {
    let target = event.target.id
    let value = event.target.value

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [target]: value,
      }
    }))
  }

  onSubmitForm = async (event) => {
    event.preventDefault()
   
    let user = this.state.user
    this.props.login(user.email, user.password);
    console.log(this.props.auth.authentication.loggedIn)
  }

  render() {
    // const classes = this.useStyles();
    const { user, } = this.state;
    if (this.props.auth.authentication.loggedIn===true) return <Redirect to='/' />
    return (
      <div className="login-page">
        <img src={logo} width={180} height={120} className="pb-3" alt="" />
        <Container className="login">
          <h2>Sign In</h2>
          <hr />
          {this.state.error ? <span className="text-danger pl-4">Incorrect Email or Password </span> : null }
          <Form className="login-form">
            <Col>
              <FormGroup>
                <Label for="email">
                  <EmailIcon className="mr-1" />
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="myemail@email.com"
                  value={user.email}
                  onChange={this.handleTextChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">
                  <LockOpenIcon className="mr-1" />
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  value={user.password}
                  onChange={this.handleTextChange}
                />
              </FormGroup>
            </Col>
            <Button
              className="ml-3 btn btn-info"
              onClick={this.onSubmitForm}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Container>
        <a href="#">Forgot Password ? Reset Here</a>
      </div>
    );
  }
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

export default connect(mapStateToProps, { ...authActions })(SignIn)