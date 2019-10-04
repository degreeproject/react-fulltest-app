import React, { Component } from 'react';
import './recipe.css';
import { connect } from 'react-redux';

import { styled } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RecipeService from '../../services/RecipeService'


const MyGrid = styled(Grid)({
  textAlign: 'center',
});
const MainGrid = styled(Grid)({
  textAlign: 'center',
  marginTop: '5%'
});
const MyCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});



class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recipe: Object
    };
  }
  componentDidMount() {
    const id = (this.props.location.pathname).replace("/recipes/", "")
    if(this.props.recipe){
    const recipe = this.props.recipe.recipes.find((ele) => {
      return ele.id === id
    })
    this.setState({
      recipe: recipe,
      isLoaded: true
      })
   }else{
    RecipeService.getRecipe(id)
    .then((request) => {
      this.setState({
        recipe: request.data,
        isLoaded: true
      })
    })
    .catch(console.log)
   }
  }
  // static getIngredients(recipe){
  //   this.state.recipe.ingredient.map(rec => (
  //     <ListItem>
  //       <ListItemText primary={rec.name}/>
  //       <ListItemText primary={}/>
  //     </ListItem>
  //   ))}
  // }

  render() {
    var {isLoaded, recipe} = this.state
    if(!isLoaded){
      return <div>Loading recipes...</div>
    }
    else{
      // const ingredients = getIngredients(recipe);
      return (
        <Container>
          <MainGrid container spacing={3}>
            <MyGrid item xs={5}>
            <MyCardMedia image={recipe.image}></MyCardMedia>
            </MyGrid>
            <MyGrid item xs={7}>
            ingredients
            </MyGrid>
            <MyGrid item xs={5}>
            {this.state.recipe.step.map(rec => (
              <ListItem>
                <ListItemText primary={rec.description}/>
              </ListItem>
            ))}
            </MyGrid>
            <MyGrid item xs={12}>
              Notes
            </MyGrid>
            <MyGrid item xs={12}>
              Comments
            </MyGrid>
          </MainGrid>
        </Container>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { recipe } = state
  return {
    recipe: recipe[0]
  }
};

export default connect(mapStateToProps)(Recipe);