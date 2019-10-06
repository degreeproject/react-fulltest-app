import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../home/home'
import Recipes from '../recipes/recipes'
import Recipe from '../recipe/recipe'
import Calendar from '../calendar/calendar'
import Login from '../login/login'
import Register from '../register/register'
import CreateRecipe from '../create-recipe/create-recipe'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const RouterView = () => (
  <main>
    <Switch>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes/:id' component={Recipe}/>
      <Route exact path='/recipes' component={Recipes}/>
      <Route exact path='/create-recipe' component={CreateRecipe}/>
      <Route exact path='/calendar' component={Calendar}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      {/* Matches rest of urls */}
      <Route path='/' component={Home}/>
    </Switch>
  </main>
)

export default RouterView