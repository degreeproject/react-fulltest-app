import React, { Component } from 'react';
import './recipes.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { styled } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RecipeService from '../../services/RecipeService'
import { Container } from '@material-ui/core';

const MyGrid = styled(Grid)({
  textAlign: 'center',
});
const MainGrid = styled(Grid)({
  textAlign: 'center',
  marginTop: '5%'
});
const MyContainer = styled(Container)({
  marginTop: '5%'
});
const MyCard = styled(Card)({
  minWidth: 345,
  maxWidth: 345,
});
const MyCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recipes: Array
    };
  }
  componentDidMount() {
    if(this.props.recipe){
      const recipes = this.props.recipe.recipes;
      this.setState({
        recipes: recipes,
        isLoaded: true
        })
     }else{
      RecipeService.getRecipes()
      .then((request) => {
        this.setState({
          recipes: request.data,
          isLoaded: true
        })
      })
      .catch(console.log)
     }
    }

  render() {
    let {isLoaded, recipes} = this.state
    if(!isLoaded){
      return <div>Loading recipes...</div>
    }
    else{
      return (
        <div>
        <MyContainer>
          <Link to="/create-recipe">
            <Fab color="primary" aria-label="add">
              <AddIcon/>
            </Fab>
          </Link>
          <MainGrid container spacing={1} cols={12}>
            {recipes.map(rec => (
              <Link key={rec._id} className="router-links" to={"recipes/" + rec.id}>
              <MyGrid item xs={12}>
                <MyCard className="height: 200">
                    <CardActionArea>
                      <MyCardMedia
                        className="maxWidth: 345"
                        image={rec.image}
                        title={rec.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {rec.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {rec.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </MyCard>
              </MyGrid>
            </Link>
            ))}
          </MainGrid>
        </MyContainer>
        </div>
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

export default connect(mapStateToProps)(Recipes);