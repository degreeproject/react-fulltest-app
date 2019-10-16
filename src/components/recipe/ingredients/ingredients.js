import React from 'react';
import {Grid, ListItem, ListItemText}from '@material-ui/core';
import { styled } from '@material-ui/styles';

const MyGrid = styled(Grid)({
    textAlign: 'center',
  });

function Ingredients(props) {
  let i = props.id;
    return (
      <MyGrid item xs={7}>
        <h3>Ingredients</h3>
        
        {props.ingredients.map(ingredient => (
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
    );
  }

  export default Ingredients;