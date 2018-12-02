import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import DefaultHeader from './DefaultHeader';
import ArticleHeader from './ArticleHeader';

class HeaderLayout extends Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={DefaultHeader} />
        <Route path="/tags" component={DefaultHeader} />
        <Route path="/about" component={DefaultHeader} />
        <Route path="/article" component={ArticleHeader} />
      </Switch>
    )
  }
}

export default HeaderLayout
