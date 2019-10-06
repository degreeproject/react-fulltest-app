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
      steps: [{
        instruction: ""
      }],
      notes: ""
    };
  }

  // validateForm() {
  //   return this.state.username.length > 0 && this.state.firstname.length > 0 && this.state.lastname.length > 0 
  //   && this.state.email.length > 0 && this.state.password.length > 7 && this.state.repeatpassword.length > 7 && this.state.password === this.state.repeatpassword;
  // }

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value
    })
  }
  addIngredient = () => {
    this.setState({
      ingredient: this.state.ingredient.concat([{ name: "", amount: "", unit: "" }])
    });
  }
  removeIngredient = (idx) => {
    this.setState({
      ingredient: this.state.ingredient.filter((s, _idx) => _idx !== idx)
    });
  }
  addInstruction = () => {
    this.setState({
      steps: this.state.steps.concat([{ name: "" }])
    });
  }
  removeInstruction = (idx) => {
    this.setState({
      steps: this.state.steps.filter((s, _idx) => _idx !== idx)
    });
  }
  handleIngredientNameChange = idx => evt => {
    const newIngredient = this.state.ingredient.map((ingredient, ingidx) => {
      if (idx !== ingidx) return ingredient;
      return { ...ingredient, name: evt.target.value };
    });

    this.setState({ ingredient: newIngredient });
  };
  handleIngredientAmountChange = idx => evt => {
    const newIngredient = this.state.ingredient.map((ingredient, ingidx) => {
      if (idx !== ingidx) return ingredient;
      return { ...ingredient, amount: evt.target.value };
    });

    this.setState({ ingredient: newIngredient });
  };
  handleIngredientUnitChange = idx => evt => {
    const newIngredient = this.state.ingredient.map((ingredient, ingidx) => {
      if (idx !== ingidx) return ingredient;
      return { ...ingredient, unit: evt.target.value };
    });

    this.setState({ ingredient: newIngredient });
  };
  handleInstructionStepChange = idx => evt => {
    console.log()
    const newInstruction = this.state.steps.map((instruction, ingidx) => {
      if (idx !== ingidx) return instruction;
      return { ...instruction, instruction: evt.target.value };
    });

    this.setState({ instruction: newInstruction });
  };


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
                return(
                  <MyGrid key={idx} item xs={12} container direction="row" alignItems='center'>
                    <MyGrid item xs={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={`Ingredient: ${idx + 1}`}
                        value={this.state.ingredient[idx].name}
                        data-id={idx}
                        onChange={this.handleIngredientNameChange(idx)}
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
                        data-id={idx}
                        onChange={this.handleIngredientAmountChange(idx)}
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
                        data-id={idx}
                        onChange={this.handleIngredientUnitChange(idx)}
                        id={unitID}
                      />
                    </MyGrid>
                    {idx === 0 &&
                     <MyGrid item xs={3}>
                        <Button 
                         variant="contained"
                         color="primary"
                         onClick={this.addIngredient}
                          >
                       add
                        </Button>
                      </MyGrid>
                    }
                   {idx !== 0 &&
                     <MyGrid item xs={3}>
                        <Button 
                         variant="contained"
                         color="secondary"
                         onClick={() => { this.removeIngredient(idx) }}
                        >
                       Remove
                        </Button>
                      </MyGrid>
                    }

                  </MyGrid>
                )
            })}
            {this.state.steps.map((val, idx) => {
                let instructionID = `instruction-${idx}`;
                return(
                  <MyGrid key={idx} item xs={12} container direction="row" alignItems='center'>
                    <MyGrid item xs={9}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={`Instruction step: ${idx + 1}`}
                        value={this.state.steps[idx].instruction}
                        data-id={idx}
                        onChange={this.handleInstructionStepChange(idx)}
                        id={instructionID}
                        />
                    </MyGrid>
                    {idx === 0 &&
                     <MyGrid item xs={3}>
                        <Button 
                         variant="contained"
                         color="primary"
                         onClick={this.addInstruction}
                          >
                       add
                        </Button>
                      </MyGrid>
                    }
                   {idx !== 0 &&
                     <MyGrid item xs={3}>
                        <Button 
                         variant="contained"
                         color="secondary"
                         onClick={() => { this.removeInstruction(idx) }}
                        >
                       Remove
                        </Button>
                      </MyGrid>
                    }
                  </MyGrid>
                )
              })}
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