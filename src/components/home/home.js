import React, { Component } from 'react';
import './home.css';

class Home extends Component {
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
      return <div>Loading home...</div>
    }
    else{
      return (
        <div >
        </div>
    );
  }
  }
}
export default Home;