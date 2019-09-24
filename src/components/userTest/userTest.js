import React, { Component } from 'react';
import UserService from '../../services/UserService'

class usertest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: Array
    };
  }
  componentDidMount() {
    UserService.getUser()
    .then((request) => {
      this.setState({
        users: request.data,
        isLoaded: true
      })
    })
    .catch(console.log)
  }

  render() {
    var {isLoaded} = this.state
    if(!isLoaded){
      return <div>Loading Usertest..</div>
    }
    else{
      const users = this.state.users.map((u) =>
        <li key={u._id}>{u.username}</li> 
      );
      return (
        <div >
          <ul>
            {users}
          </ul>
        </div>
    );
  }
  }
}
export default usertest;