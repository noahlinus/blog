import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getArticleList, getTags } from '../action'
import ArticleList from '../components/articlelist/ArticleList'
import UserInfo from '../components/articlelist/UserInfo';

class Home extends Component {
  willCurrent = -1

  componentDidMount() {
    this.props.getArticleList({ current: 1, pageSize: 10 })
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
    this.props.getArticleList({ current, pageSize })
  }

  render() {
    const { articles, tags } = this.props
    return (
      <HomeContainer>
        <LeftContainer>
          <ArticleList
            articles={articles}
            onChange={this.onChange}
          />
        </LeftContainer>
        <RightContainer>
          <UserInfo
            tags={tags}
          />
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

const HomeContainer = styled.article`
  display: flex;
  justify-content: center;
`

const mapStateToProps = state => ({
  articles: state.article.articles,
  tags: state.article.tags,
  loading: state.article.loading
})

const mapDispatchToProps = dispatch => ({
  getArticleList: data => dispatch(getArticleList(data)),
  getTags: () => dispatch(getTags()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
