import React, {Component} from 'react';

import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from "../../services/AuthService";

import Grid from '@material-ui/core/Grid'

const MyGrid = styled(Grid)({
  textAlign: 'center',
});
const MainGrid = styled(Grid)({
  textAlign: 'center',
  marginTop: '5%',
});

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      image: "",
      ingredient: [{
        name: "",
        amount: "",
        unit: ""
      }],
      steps: [],
      notes: ""
    };
  }

  // validateForm() {
  //   return this.state.username.length > 0 && this.state.firstname.length > 0 && this.state.lastname.length > 0 
  //   && this.state.email.length > 0 && this.state.password.length > 7 && this.state.repeatpassword.length > 7 && this.state.password === this.state.repeatpassword;
  // }

  handleChange = event => {
    console.log(event.target.id)
    console.log(event.target.value)
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state)

    try {
      await AuthService.registerUser(this.state)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Container>
        <h1>Create a recipe</h1>
          <MainGrid justify="center" alignItems='center' container spacing={3}>
            <MyGrid item xs={5}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Title"
                  value={this.state.name}
                  onChange={this.handleChange}
                  id="name"
                />
            </MyGrid>
            <MyGrid item xs={7}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  id="description"
                />
            </MyGrid>
            <MyGrid item xs={12}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Image URL"
                  value={this.state.image}
                  onChange={this.handleChange}
                  id="image"
                />
            </MyGrid>
            {this.state.ingredient.map((val, idx) => {
                let ingredientID = `ingredient-${idx}`;
                let amountID = `amount-${idx}`;
                let unitID = `unit-${idx}`;
                console.log(this.state.ingredient[idx])
                return(
                  <MyGrid key={idx} item xs={12} container direction="row" alignItems='center' key={idx}>
                    <MyGrid item xs={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Ingredient"
                        value={this.state.ingredient[idx].name}
                        onChange={this.handleChange}
                        id={ingredientID}
                      />
                    </MyGrid>
                    <MyGrid item xs={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Amount"
                        value={this.state.ingredient[idx].amount}
                        onChange={this.handleChange}
                        id={amountID}
                      />
                    </MyGrid>
                    <MyGrid item xs={1}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Unit"
                        value={this.state.ingredient[idx].unit}
                        onChange={this.handleChange}
                        id={unitID}
                      />
                    </MyGrid>
                    <MyGrid item xs={3}>
                      <Button 
                          variant="contained"
                          color="primary">
                            add
                      </Button>
                    </MyGrid>
                  </MyGrid>
                )
            })}
            <MyGrid item xs={9}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Instructions"
                  value={this.state.steps}
                  onChange={this.handleChange}
                  id="steps"
                />
            </MyGrid>
            <MyGrid item xs={3}>
              <Button 
                  variant="contained"
                  color="primary">
                    add
              </Button>
            </MyGrid>
            <MyGrid item xs={12}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Notes"
                  value={this.state.notes}
                  onChange={this.handleChange}
                  id="notes"
                />
            </MyGrid>
            <MyGrid>
            <Button
              type="submit"
              fullWidth
              // disabled={!this.validateForm()}
              variant="contained"
              color="primary"
            >
              Create Recipe
            </Button>
            </MyGrid>
          </MainGrid>
        </Container>
      </div>
    );
  }
}