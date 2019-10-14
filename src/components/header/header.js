import React, { Component } from 'react';
import './header.css';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import * as authAction from '../../actions/authAction';
import * as recipeAction from '../../actions/recipeAction';
import RecipeService from '../../services/RecipeService';

const MyBox = styled(Box)({
  flexGrow: 1
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this); 
    this.state = {
    };
  }
  componentDidMount(){
    if(localStorage.getItem('user')){
      let token = JSON.parse(localStorage.getItem('user'))
      this.props.addTokenToState(token)
    }
    RecipeService.getRecipes()
    .then((request) => {
      this.setState({
        recipes: request.data,
        isLoaded: true
      })
      this.props.addRecipeToState(request.data)
    })
    .catch(console.log)
  }
  logout(){
    localStorage.clear()
    this.props.performLogout();
    this.props.history.push('/login')
  }
  render() {
    let loggedIn = (this.props.user) ? true : false
    if(!loggedIn){
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Link className="router-links" to="/home">
                <IconButton disableRipple = {true} edge="start" color="inherit" aria-label="menu">
                  TastyRecipes
                </IconButton>
              </Link>
              <MyBox></MyBox>
              <Button color="inherit" component={Link} to="/recipes">
                Recipes
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              </Toolbar>
              </AppBar>
        </div>
      );
    }else{
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Link className="router-links" to="/home">
                <IconButton disableRipple = {true} edge="start" color="inherit" aria-label="menu">
                  TastyRecipes
                </IconButton>
              </Link>
              <MyBox></MyBox>
              <Button color="inherit" component={Link} to="/recipes">
                Recipes
              </Button>
              <Button color="inherit" onClick={this.logout}>
                 Logout
              </Button>
              </Toolbar>
              </AppBar>
        </div>
      );
    }
  }
}

    const mapStateToProps = (state) => {
      const { authentication } = state
      return {
        user: authentication[0]
      }
    };
    
    const mapDispatchToProps = (dispatch) => {
      return {
        performLogout: () => dispatch(authAction.logout()),
        addTokenToState: token => dispatch(authAction.addToken(token)),
        addRecipeToState: recipes => dispatch(recipeAction.addRecipes(recipes))
      }
    };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
