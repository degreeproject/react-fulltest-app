import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, TextField, Typography, Container} from '@material-ui/core';
import AuthService from "../../services/AuthService";
import * as authAction from '../../actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 7;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    let user = {
      token: {
        type: "",
        access_token: ""
      },
      name: "",
    }
    try {
      await AuthService.loginUser(this.state).then(data => {
        user.token.type = data.token_type
        user.token.access_token = data.access_token
        user.name = data.name

        this.props.performLogin(user)
      });
      localStorage.setItem('user', JSON.stringify(user))
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField variant="outlined" margin="normal" required fullWidth label="Username"
              value={this.state.username} onChange={this.handleChange} id="username" autoFocus />
            <TextField variant="outlined" margin="normal" required fullWidth value={this.state.password}
              onChange={this.handleChange} label="Password" type="password" id="password" />
            <Button type="submit" fullWidth disabled={!this.validateForm()} variant="contained" color="primary">
              Sign In
            </Button>
          </form>
        </Container>
    );
  }
}

/**
 * Maps the Redux state so that the global state is available through the local props in this component
 */
const mapStateToProps = (state) => {
  const { authentication } = state
  return {
    user: authentication[0]
  }
};

/**
 * Maps the functions available in Redux so that they are accessible in this component
 */
const mapDispatchToProps = (dispatch) => {
  return {
    performLogin: user => dispatch(authAction.login(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);