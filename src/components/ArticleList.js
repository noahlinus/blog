import React, { Component } from 'react';
import styled from 'styled-components';

class ArticleList extends Component {
  renderList = articles => articles.map((item, index) => (
    <PostContent key={`${item.id}`}>
      <PostTitle>
        {item.title}
      </PostTitle>
      <PostContentPreview>
        {this.reviewText(item.body)}
      </PostContentPreview>
      <PostMeta>
        Posted by lindayuan on 2018-10-03
      </PostMeta>
    </PostContent>
  ))

  reviewText = (text) => `${text.substring(0, 300)}...`

  render() {
    const { articles } = this.props
    return (
      <div>
        {
          this.renderList(articles)
        }
      </div>
    )
  }
}

const PostContent = styled.div`
  border-bottom: 1px solid #eee;
`

const PostTitle = styled.h1`
  font-size: 26px;
  line-height: 1.3;
  margin-bottom: 10px;
`

const PostContentPreview = styled.div`
  font-style: italic;
  color: #a3a3a3;
  min-height: 100px; 
  overflow: hidden;
  text-overflow: ellipsis;
`

const PostMeta = styled.p`
  font-family: 'Lora','Times New Roman',serif;
  color: gray;
  font-size: 16px;
  font-style: italic;
`

export default ArticleList
