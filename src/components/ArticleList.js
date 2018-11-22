import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Pagination, Spin } from 'antd'

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
        Posted by lindayuan on {moment(item.created_at).format("YYYY-MM-DD")}
      </PostMeta>
    </PostContent>
  ))

  reviewText = (text) => `${text.substring(0, 300)} ......`

  render() {
    const { loading, articles } = this.props
    const { data, pagination } = articles
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
            <Spin size="large" />
          </LoadingLayout>
        }
      </PostContainer>
    )
  }
}

const PostContainer = styled.div`
  margin: 30px 0 120px;
  min-height: 200px;
  position: relative;
`

const PostContent = styled.div`
  padding: 18px 0 10px;
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
  min-height: 80px; 
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
`

const PostMeta = styled.p`
  font-family: 'Lora','Times New Roman',serif;
  color: #ccc;
  font-size: 16px;
  font-style: italic;
`

const PaginationContainer = styled.div`
  margin: 20px 0;
  padding: 0 20px;
  right: 10px;
  text-align: center;
  position: relative;
  .ant-pagination {
    display: inline-block;
  }
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

export default ArticleList
