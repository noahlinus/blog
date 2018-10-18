import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './modules/Home'
import Archives from './modules/Archives';
import Article from './modules/Article';
import Tags from './modules/Tags';
import About from './modules/About';

function Routers() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/archives" component={Archives} />
      <Route path="/article" component={Article} />
      <Route path="/tags" component={Tags} />
      <Route path="/about" component={About} />
    </Switch>
  )
}

export default Routers
