import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from '../components/article/Markdown'
import { connect } from 'react-redux'
import { getArticleContent } from '../action';
import { Spin } from 'antd';

class Article extends Component {
  componentDidMount() {
    let { search } = this.props.location
    if (search) {
      const number = search.substring(1)
      this.props.getArticleContent(number)
    }
  }

  render() {
    const { articleContent, loading } = this.props
    let value = ''
    if (articleContent && articleContent.body) {
      value = articleContent.body
    }
    return (
      <ArticleContainer>
        <ArticleContent>
          {loading ?
            <LoadingContainer>
              <Spin size="large" />
            </LoadingContainer> :
            <Markdown
              value={value}
            />
          }
        </ArticleContent>
      </ArticleContainer>
    )
  }
}

const mapStateToProps = state => (
  {
    articleContent: state.article.articleContent,
    loading: state.global.loading
  }
)

const mapDispatchToProps = dispatch => ({
  getArticleContent: (number) => dispatch(getArticleContent(number))
})

const ArticleContainer = styled.article`
  position: relative;
  margin-top: 20px;
`

const ArticleContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 70px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Article)
