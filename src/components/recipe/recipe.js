import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';
import {Grid, CardMedia, Container, ListItem, ListItemText, TextField, Button } from '@material-ui/core';

import './recipe.css';
import Comment from './comment/comment'
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
    this.submitComment = this.submitComment.bind(this); 
    this.state = {
      isLoaded: false,
      recipe: Object,
      comment: {
        commentator: '',
        comment: ''
      }
    };
  }
  
  handleCommentChange = event => {
    this.setState({
      comment:{
        commentator: this.state.comment.commentator,
        comment: event.target.value
      }
    });
  }
  validateCommentForm() {
    return (
      this.state.comment.comment.length > 0
    )
  }
  submitComment() {
    RecipeService.submitComment({
      commentator: this.props.user.name,
      comment: this.state.comment.comment,
      recipe: this.state.recipe.id
    })
    .catch(console.log)
  }

  componentDidMount() {
    const id = (this.props.location.pathname).replace("/recipes/", "")
    if(this.props.recipe){
    const recipe = this.props.recipe.recipes.find((ele) => {
      return ele.id === id
    })
    this.setState({
      recipe: recipe,
      isLoaded: true,
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

  render() {
    var {isLoaded, recipe} = this.state
    if(!isLoaded){
      return <div>Loading recipes...</div>
    }
    else{
      let i = 0;
      let j = 2000;
      return (
        <Container>
          <MainGrid container spacing={3}>
            <MyGrid item xs={5}>
              <MyCardMedia image={recipe.image} />
            </MyGrid>
            <MyGrid item xs={7}>
              <h3>Ingredients</h3>
              {recipe.ingredient.map(ingredient => (
              <ListItem key={i++}>
                <ListItemText primary={ingredient.name} />
                {(ingredient.amount && ingredient.unit) ?
                (
                <ListItemText primary={ingredient.amount + " " + ingredient.unit} />) : (ingredient.amount) ?
                <ListItemText primary={ingredient.amount} /> : (ingredient.unit) ?
                <ListItemText primary={ingredient.unit} /> : ""}
              </ListItem>
              ))}
            </MyGrid>
            <MyGrid item xs={5}>
              <h3>Instructions</h3>
              {recipe.step.map(step => (
              <ListItem key={i++}>
                <ListItemText primary={step.description} />
              </ListItem>
              ))}
            </MyGrid>
            <MyGrid item xs={12}>
              <h3>Notes</h3>
              {recipe.notes}
            </MyGrid>
            <MyGrid item xs={12}>
              <h3>Comments</h3>
              <form>
                <TextField variant="outlined" margin="normal" required fullWidth label="Comment"
                  value={this.state.comment.comment} onChange={this.handleCommentChange} id="comment" />
                <Button type="submit" fullWidth disabled={!this.validateCommentForm()} variant="contained"
                  color="primary" onClick={this.submitComment}>
                  Submit Comment
                </Button>
              </form>
            </MyGrid>
            {recipe.comments.map(comment => (
            <Comment key={j++} comment={comment}></Comment>
            ))}
          </MainGrid>
        </Container>
      );
    }
  }
}


/**
 * Maps the Redux state so that the global state is available through the local props in this component
 */
const mapStateToProps = (state) => {
  const { recipe, authentication } = state
  return {
    recipe: recipe[0],
    user: authentication[0]
  }
};
export default connect(mapStateToProps)(Recipe);