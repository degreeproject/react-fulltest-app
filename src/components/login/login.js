import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }
  componentDidMount() {
  }

  render() {
    var {isLoaded} = this.state
    if(!isLoaded){
      return <div>Loading login...</div>
    }
    else{
      return (
        <div >
        </div>
    );
  }
  }
}
export default Login;