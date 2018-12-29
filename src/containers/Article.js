import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from '../components/article/Markdown'
import { connect } from 'react-redux'
import { getArticleContent } from '../action';
import { Spin } from 'antd';
import ArticleHeader from '../components/header/ArticleHeader';
import ArticleMenu from '../components/article/ArticleMenu';

class Article extends Component {
  componentDidMount() {
    this.getArticle()
  }

  async getArticle() {
    let { search } = this.props.location
    if (search) {
      const key = decodeURIComponent(search.substring(1))
      await this.props.getArticleContent(key)
    }
  }

  render() {
    const { articleContent, loading } = this.props
    const { data, menuList } = articleContent
    const value = data.content
    return (
      <div>
        <ArticleHeader
          title={data.title}
          date={data.date}
          tags={data.tags.split(',')}
        />
        <ArticleContainer>
          <ArticleContent>
            {loading ?
              <LoadingContainer>
                <Spin />
              </LoadingContainer> :
              <Markdown
                value={value}
              />
            }
            <ArticleMenu
              menuList={menuList}
            />
          </ArticleContent>
        </ArticleContainer>
      </div>

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
  getArticleContent: (number) => dispatch(getArticleContent(number)),
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
