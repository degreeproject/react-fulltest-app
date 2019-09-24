import React from 'react';
import ReactDOM from 'react-dom';
import Recipes from '../recipes/recipes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Recipes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
