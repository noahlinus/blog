import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from '../components/article/Markdown'
import { connect } from 'react-redux'
import { getArticleContent } from '../action';

class Article extends Component {
  componentDidMount() {
    console.log(this.props)
    let { search } = this.props.location
    if (search) {
      const number = search.substring(1)
      this.props.getArticleContent(number)
    }
  }

  render() {
    const { articleContent } = this.props
    let value = ''
    if (articleContent && articleContent.data && articleContent.data.body) {
      value = articleContent.data.body
    }
    return (
      <ArticleContainer>
        <ArticleContent>
          <Markdown
            value={value}
          />
        </ArticleContent>
      </ArticleContainer>
    )
  }
}

const mapStateToProps = state => (
  {
    articleContent: state.article.articleContent
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

export default connect(mapStateToProps, mapDispatchToProps)(Article)
