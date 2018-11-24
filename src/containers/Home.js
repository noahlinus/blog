import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getArticle, getTags } from '../action'
import ArticleList from '../components/ArticleList'

class Home extends Component {
  willCurrent = -1

  componentDidMount() {
    this.props.getArticle({ current: 1, pageSize: 10 })
    this.props.getTags()
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
      <HomeContainer>
        <LeftContainer>
          <ArticleList
            articles={articles}
            loading={loading}
            onChange={this.onChange}
          />
        </LeftContainer>
        <RightContainer>

        </RightContainer>
      </HomeContainer>
    )
  }
}

const LeftContainer = styled.div`
  width: 800px;
  display: inline-block;
`

const RightContainer = styled.div`
  margin-left: 50px;
  display: inline-block;
`

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
`

const mapStateToProps = state => ({
  articles: state.article.articles,
  loading: state.article.loading
})

const mapDispatchToProps = dispatch => ({
  getArticle: data => dispatch(getArticle(data)),
  getTags: data => dispatch(getTags())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
