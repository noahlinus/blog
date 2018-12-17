import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import DefaultHeader from '../components/header/DefaultHeader';
import ArticleHeader from '../components/header/ArticleHeader';

class Header extends Component {
  render() {
    const { articleContent } = this.props
    return (
      <Switch>
        <Route exact={true} path="/" component={() => <DefaultHeader />} />
        <Route path="/tags" component={DefaultHeader} />
        <Route path="/about" component={DefaultHeader} />
        <Route path="/article"
          component={
            () =>
              <ArticleHeader
                title={articleContent.title}
                date={articleContent.created_at}
                tags={articleContent.labels}
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
