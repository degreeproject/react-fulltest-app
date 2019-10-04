import React, { Component } from 'react';
import './home.css';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }
  componentDidMount() {
    
  } 
  render() {
    let loggedIn = (this.props.user) ? true : false
    if(loggedIn){
      return (
        <div >
          <h1>Hello: {this.props.user.name}</h1>
          <h2>Localstorage: {localStorage.getItem('user')}</h2>
        </div>
      );
    }else{
      return(
        <div>
          <h1>Not logged in</h1>
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  const { authentication } = state
  return {
    user: authentication[0]
  }
};

export default connect(mapStateToProps)(Home);