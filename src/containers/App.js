import React, { Component } from 'react';
import HeaderLayout from '../components/HeaderLayout';
import { BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
import Routers from '../route'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderLayout />
          <Container>
            <Routers />
          </Container>
        </div>
      </Router>
    )
  }
}

const Container = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`

export default App;
