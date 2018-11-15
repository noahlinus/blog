import React, { Component } from 'react';
import HeaderLayout from '../components/HeaderLayout';
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from '../route';

class App extends Component {
  render() {
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

export default App;
