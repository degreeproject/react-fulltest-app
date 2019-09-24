import React, { Component } from 'react';
import './calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      calendar: Array
    };
  }
  componentDidMount() {
  }

  render() {
    var {isLoaded} = this.state
    if(!isLoaded){
      return <div>Loading calendar...</div>
    }
    else{
      return (
        <div >
        </div>
    );
  }
  }
}
export default Calendar;