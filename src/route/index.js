import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import Tags from '../containers/Tags';
import About from '../containers/About';

function Routers() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/tags" component={Tags} />
      <Route path="/about" component={About} />
    </Switch>
  )
}

export default Routers

