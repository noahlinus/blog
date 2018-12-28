import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getArticleList, getTags } from '../action'
import ArticleList from '../components/articlelist/ArticleList'
import UserInfo from '../components/articlelist/UserInfo';
import DefaultHeader from '../components/header/DefaultHeader';

class Home extends Component {
  componentDidMount() {
    this.props.getArticleList({ current: 1 })
    this.props.getTags()
  }

  onChange = (current) => {
    window.location.href = "#home-container";
    this.props.getArticleList({ current })
  }

  render() {
    const { articles, tags } = this.props
    return (
      <div>
        <DefaultHeader />
        <HomeContainer id="home-container">
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
      </div>
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
