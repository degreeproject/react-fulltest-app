import React from 'react';
import ReactDOM from 'react-dom';
import userTest from './userTest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<userTest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
