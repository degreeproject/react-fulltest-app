import React, { Component } from 'react';
import { connect } from 'react-redux';
import './home.css';

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
          <h1>Hello: {this.props.user.name}, welcome to TastyRecipes!</h1>
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
/**
 * Maps the Redux state so that the global state is available through the local props in this component
 */
const mapStateToProps = (state) => {
  const { authentication } = state
  return {
    user: authentication[0]
  }
};

export default connect(mapStateToProps)(Home);