import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from '../header/header';
import configureStore from '../../store/configureStore'

const store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
