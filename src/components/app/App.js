import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Header from '../../components/header/header'
import View from '../../components/router-view/router-view'

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Container>
          <View/>
        </Container>
      </Router>
    </div>
  );
}

export default App;
