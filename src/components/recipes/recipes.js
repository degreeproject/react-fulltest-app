import React, { Component } from 'react';
import './recipes.css';
import RecipeService from '../../services/RecipeService'

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recipes: Array
    };
  }
  componentDidMount() {
    RecipeService.getRecipes()
    .then((request) => {
      this.setState({
        recipes: request.data,
        isLoaded: true
      })
    })
    .catch(console.log)
  }

  render() {
    var {isLoaded} = this.state
    if(!isLoaded){
      return <div>Loading recipes...</div>
    }
    else{
      const recipe = this.state.recipes.map((rec) =>
        <li key={rec._id}>{rec.name}</li> 
      );
      return (
        <div >
          <ul>
            {recipe}
          </ul>
        </div>
    );
  }
  }
}
export default Recipes;