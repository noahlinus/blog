import React, { Component } from 'react'
import Markdown from '../components/article/Markdown';
import { Button } from 'antd';
import articles from '../assets/articles'

const MKData = [
  'ES6设计模式-设计原则.md',
  'http请求.md',
  'React生命周期详解.md',
  'TensorFlow-js浏览器的人工智能.md',
  '使用create-react-app添加css modules.md',
  '性能优化.md'
]

class MarkdownTest extends Component {
  state = {
    value: ''
  }

  async handleClick(text) {
    console.log(articles)
    const res = await import(`../_posts/${text}`)
    this.setState({
      value: res.default
    })
  }

  renderList() {
    return (
      <ul>
        {MKData.map((text, index) => (
          <li key={`${index}`}>
            {text}
            <Button
              style={{ margin: '5px' }}
              onClick={() => this.handleClick(text)} >
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
