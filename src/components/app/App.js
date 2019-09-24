import React from 'react';
import Container from '@material-ui/core/Container'
import Header from '../../components/header/header'
import Main from '../../components/main/main'

function App() {
  return (
    <div className="App">
      <Header/>
      <Container>
        <Main/>
      </Container>
    </div>
  );
}

export default App;
