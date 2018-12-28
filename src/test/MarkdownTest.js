import React, { Component } from 'react'
import Markdown from '../components/article/Markdown';
import { Button } from 'antd';
import { getPosts,getPostContent } from '../api/posts'

class MarkdownTest extends Component {
  state = {
    posts: [],
    value: ''
  }

  componentDidMount() {
    getPosts(1).then((res) => {
      console.log(res)
      this.setState({
        posts: res.default.data,
      })
    })
  }

  async handleClick(text) {
    const res = await getPostContent(text)
    console.log(res)
    this.setState({
      value: res.default.content
    })
  }

  renderList() {
    const { posts } = this.state
    return (
      <ul>
        {posts.map((item, index) => (
          <li key={`${index}`}>
            {item.title}
            <Button
              style={{ margin: '5px' }}
              onClick={() => this.handleClick(item.key)} >
              打开
            </Button>
          </li>
        ))}
      </ul>
    )
  }
  render() {
    const { value } = this.state
    return (
      <div>
        {this.renderList()}
        <div style={{ maxWidth: '800px', margin: '30px auto' }}>
          <Markdown
            value={value}
          />
        </div>
      </div>
    )
  }
}

export default MarkdownTest
