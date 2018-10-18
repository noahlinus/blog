import * as React from 'react';
import HeaderLayout from './components/HeaderLayout';
import Routers from './router';
import { BrowserRouter as Router } from 'react-router-dom'

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

export default App
