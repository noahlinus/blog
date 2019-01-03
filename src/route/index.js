import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import Tags from '../containers/Tags'
import About from '../containers/About'
import Article from '../containers/Article'
import NotFound from '../containers/NotFound';

function Routers() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/tags" component={Tags} />
      <Route path="/about" component={About} />
      <Route path="/article/:name" component={Article} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routers

