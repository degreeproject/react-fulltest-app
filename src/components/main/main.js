import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserTest from '../usertest/usertest'
import Home from '../home/home'
import Recipes from '../recipes/recipes'
import Calendar from '../calendar/calendar'
import Login from '../login/login'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/usertest' component={UserTest}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes' component={Recipes}/>
      <Route exact path='/calendar' component={Calendar}/>
      <Route exact path='/login' component={Login}/>
      {/* Matches rest of urls */}
      <Route path='/' component={Home}/>
    </Switch>
  </main>
)

export default Main