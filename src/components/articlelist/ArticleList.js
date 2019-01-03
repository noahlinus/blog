import React, { Component } from 'react'
import styled from 'styled-components'
import { Pagination, Spin } from 'antd'
import TagList from '../common/TagList'
import { withRouter } from 'react-router-dom'
import Config from '../../config'

class ArticleList extends Component {
  handleArticleClick(key) {
    this.props.history.push({
      pathname: `/article/${key.split('.')[0]}`
    })
  }

  renderList = articles => articles.map((item) => (
    <PostContent key={`${item.key}`}>
      <PostContentData onClick={() => this.handleArticleClick(item.key)}>
        <PostTitle>
          {item.title}
        </PostTitle>
        <PostContentPreview>
          {item.preview}
        </PostContentPreview>
      </PostContentData>
      <PostDate>
        Posted by {Config.author} on {item.date}
      </PostDate>
      <TagContainer>
        <TagList tags={item.tags.split(',')} />
      </TagContainer>

    </PostContent>
  ))

  reviewText = (text) => {
    let revText = `${text.substring(0, 300).replace(/#/g, '')}...`
    const links = /!\[\]\((.*?)\)/g
    let stra
    while ((stra = links.exec(revText)) !== null) {
      revText = revText.replace(stra[0],'')
    }
    return revText
  }

  render() {
    const { articles } = this.props
    const { loading, data, pagination } = articles
    return (
      <PostContainer>
        {
          this.renderList(data)
        }
        {
          pagination.total > pagination.pageSize &&
          <PaginationContainer>
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={this.props.onChange}
            />
          </PaginationContainer>
        }
        {
          loading &&
          <LoadingLayout>
            <Spin />
          </LoadingLayout>
        }
      </PostContainer>
    )
  }
}

const PostContainer = styled.div`
  margin: 30px 0 50px;
  min-height: 200px;
  position: relative;
`

const PostContent = styled.div`
  padding: 10px 0 20px;
  border-bottom: 1px solid #eee;
`

const PostContentData = styled.div`
  padding: 10px 5px;
  cursor: pointer;
  &:hover{
    background: #E6F7FE;
  }
  &:active{
    background: #B0E2FF;
  }
`

const PostTitle = styled.h1`
  font-size: 26px;
  line-height: 1.3;
  margin-bottom: 10px;
`

const PostContentPreview = styled.div`
  color: #999;
  min-height: 80px; 
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
`

const PostDate = styled.p`
  font-family: 'Lora','Times New Roman',serif;
  color: gray;
  font-size: 18px;
  margin: 5px;
  font-style: italic;
`

const LoadingLayout = styled.div`
  position: absolute;
  text-align: center;
  border-radius: 4px;
  top: 20px;
  left: 0;
  right: 0;
  margin-bottom: 20px;
  padding: 50px 100px;
  margin: 20px 0;
`
const TagContainer = styled.div`
  margin-left: 2px;
`

const PaginationContainer = styled.div`
  margin: 20px auto;
  text-align: center;
  position: relative;
  .ant-pagination {
    display: inline-block;
  }
`

export default withRouter(ArticleList)
