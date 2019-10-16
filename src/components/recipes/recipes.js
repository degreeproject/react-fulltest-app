import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';

import{Fab, Container, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RecipeItem from './recipe-item/recipe-item'

import './recipes.css';
import RecipeService from '../../services/RecipeService'

const MyContainer = styled(Container)({
  marginTop: '5%'
});
const MainGrid = styled(Grid)({
  textAlign: 'center',
  marginTop: '5%'
});

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      recipes: Array
    };
  }
  componentDidMount() {
    if(this.props.recipe){
      const recipes = this.props.recipe.recipes;
      this.setState({
        recipes: recipes,
        loaded: true
        })
     }else{
      RecipeService.getRecipes()
      .then((request) => {
        this.setState({
          recipes: request.data,
          loaded: true
        })
      })
      .catch(console.log)
     }
    }

  render() {
    let {loaded, recipes} = this.state
    if(!loaded){
      return <div>Loading recipes...</div>
    }
    else{
      return (
        <MyContainer>
          <Link to="/create-recipe">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
          <MainGrid container spacing={1} cols={12}>
            {recipes.map(recipe => (
              <RecipeItem recipe={recipe} />
            ))}
          </MainGrid>
        </MyContainer>
      );
    }
  }
}

/**
 * Maps the Redux state so that the global state is available through the local props in this component
 */
const mapStateToProps = (state) => {
  const { recipe } = state
  return {
    recipe: recipe[0]
  }
};

export default connect(mapStateToProps)(Recipes);