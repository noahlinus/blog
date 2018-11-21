import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getArticle } from '../action'
import ArticleList from '../components/ArticleList'

const LeftContainer = styled.div`
  width: 800px;
`

const RightContainer = styled.div`
  width: 200px;
`

class Home extends Component {
  willCurrent = -1

  componentDidMount() {
    this.props.getArticle({ current: 1, pageSize: 10 })
  }

  componentDidUpdate() {
    const { pagination } = this.props.articles

    if (this.willCurrent === pagination.current) {
      this.willCurrent = -1
      window.scrollTo(0, 0)
    }
  }

  onChange = (current, pageSize) => {
    this.willCurrent = current
    this.props.getArticle({ current, pageSize })
  }

  render() {
    const { articles, loading } = this.props
    return (
      <div>
        <LeftContainer>
          <ArticleList
            articles={articles}
            loading={loading}
            onChange={this.onChange}
          />
        </LeftContainer>
        <RightContainer>

        </RightContainer>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  articles: state.article.articles,
  loading: state.article.loading
})

const mapDispatchToProps = dispatch => ({
  getArticle: data => dispatch(getArticle(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
