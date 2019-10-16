import React from 'react';
import { Link } from 'react-router-dom'
import {Grid, Card, CardActionArea, CardMedia, CardContent, Typography} from '@material-ui/core';
import { styled } from '@material-ui/styles';

const MyGrid = styled(Grid)({
    textAlign: 'center',
  });
const MyCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});
const MyCard = styled(Card)({
  minWidth: 360,
  maxWidth: 360,
});

function RecipeItem(props) {
    return (
        <Link key={props.recipe._id} className="router-links" to={"recipes/" + props.recipe.id}>
        <MyGrid item xs={12}>
          <MyCard className="height: 200">
            <CardActionArea>
              <MyCardMedia className="maxWidth: 345" image={props.recipe.image} title={props.recipe.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.recipe.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.recipe.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </MyCard>
        </MyGrid>
        </Link>
    );
  }

  export default RecipeItem;