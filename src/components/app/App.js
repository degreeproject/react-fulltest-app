import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Header from '../../components/header/header'
import Main from '../../components/main/main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
