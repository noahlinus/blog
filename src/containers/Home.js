import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { getIssues } from '../api/github'
import { getArticle } from '../action';
import ArticleList from '../components/ArticleList';

class Home extends Component {
  // state = {
  //   issues: [],
  // }

  componentDidMount() {
    this.getIssues()
  }

  getIssues() {
    // const result = await getIssues({ page: 1, per_page: 15 })
    // console.log('lailailai', result)
    this.props.getArticle([])
    // this.setState({ issues: result.data })
  }

  render() {
    const { articles } = this.props
    return (
      <div>
        <ArticleList
          articles={articles}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles
})

const mapDispatchToProps = dispatch => ({
  getArticle: articles => dispatch(getArticle(articles))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
