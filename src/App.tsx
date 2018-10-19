import * as React from 'react';
import HeaderLayout from './components/HeaderLayout';
import Routers from './router';
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <HeaderLayout />
          <Routers />
        </div>
      </Router>
    )
  }
}

const ArticleContainer = styled.article`
  
`

export default App
