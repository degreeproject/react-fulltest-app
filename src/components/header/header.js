import React from 'react';
import './header.css';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

function Header() {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link className="router-links" to="/home">
              <IconButton disableRipple = {true} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                TastyRecipes
              </IconButton>
            </Link>
            <div className={classes.root}></div>
            <Button color="inherit" component={Link} to="/recipes">
              Recipes
            </Button>
            <Button color="inherit" component={Link} to="/calendar">
              Calendar</Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            </Toolbar>
            </AppBar>
      </div>
    );
    }

export default Header;
