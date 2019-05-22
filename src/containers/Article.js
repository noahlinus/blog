import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from '../components/article/Markdown'
import { connect } from 'react-redux'
import { getArticleContent } from '../action';
import ArticleHeader from '../components/header/ArticleHeader';
import ArticleMenu from '../components/article/ArticleMenu';
import NotFound from './NotFound';
import Comments from '../components/common/Comments';
import Skeleton from '../components/common/Skeleton';

class Article extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getArticle();
  }

  getArticle() {
    let { name } = this.props.match.params
    if (name) {
      this.props.getArticleContent(name)
    }
  }

  render() {
    const { articleContent } = this.props
    const { data, menuList, isNotFound, loading } = articleContent
    if (isNotFound) {
      return <NotFound />
    }
    return (
      <div>
        <ArticleHeader
          title={data.title}
          date={data.date}
          tags={data.tags.split(',')}
          imgSrc={data.header_img}
          loading={loading}
        />
        <ArticleContainer>
          {loading ?
            <LoadingContainer>
              <Skeleton />
            </LoadingContainer> :
            <ArticleContent>

              <Markdown
                value={data.content}
              />
              <ArticleMenu
                menuList={menuList}
              />
            </ArticleContent >}
          <Comments />
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
  max-width: 800px;
  margin: 0 auto;
`

export default connect(mapStateToProps, mapDispatchToProps)(Article)
