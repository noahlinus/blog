import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import DefaultHeader from '../components/header/DefaultHeader';
import ArticleHeader from '../components/header/ArticleHeader';

class Header extends Component {
  render() {
    const { data } = this.props.articleContent
    return (
      <Switch>
        <Route exact={true} path="/" component={() => <DefaultHeader />} />
        <Route path="/tags" component={DefaultHeader} />
        <Route path="/about" component={DefaultHeader} />
        <Route path="/article"
          component={
            () =>
              <ArticleHeader
                title={data.title}
                date={data.date}
                tags={data.tags}
              />
          }
        />
      </Switch>
    )
  }
}

const mapStateToProps = state => (
  {
    articleContent: state.article.articleContent,
  }
)

export default connect(mapStateToProps)(Header)
