import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import styled from 'styled-components'

const MarkDownContainer = styled.section`
  color: #2f2f2f;
  word-break: break-word !important;
  word-break: break-all;
  font-size: 16px;
  line-height: 1.7;
  p {
    margin: 0 0 25px
  }
  blockquote h1:last-child,
  blockquote h2:last-child,
  blockquote h3:last-child,
  blockquote h4:last-child,
  blockquote h5:last-child,
  blockquote h6:last-child,
  blockquote li:last-child,
  blockquote ol:last-child,
  blockquote p:last-child,
  blockquote ul:last-child {
    margin-bottom: 0
  }
  li p {
    overflow: visible
  }
  a {
    color: #3194d0
  }
  a:hover {
    color: #3194d0;
    text-decoration: underline
  }
  a.active,
  a:active,
  a:focus {
    color: #3194d0
  }
  a.disabled,
  a.disabled.active,
  a.disabled:active,
  a.disabled:focus,
  a.disabled:hover,
  a[disabled],
  a[disabled].active,
  a[disabled]:active,
  a[disabled]:focus,
  a[disabled]:hover {
    cursor: not-allowed;
    color: #f5f5f5
  }
  ol,
  p,
  ul {
    word-break: break-word !important;
    word-break: break-all
  }
  hr {
    margin: 0 0 20px;
    border-top: 1px solid #ddd
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 15px 0 15px;
    font-weight: 700;
    color: #2f2f2f;
    line-height: 1.7;
    text-rendering: optimizelegibility
  }
  h1 {
    font-size: 26px
  }
  h2 {
    font-size: 24px
  }
  h3 {
    font-size: 22px
  }
  h4 {
    font-size: 20px
  }
  h5 {
    font-size: 18px
  }
  h6 {
    font-size: 16px
  }
  img {
    max-width: 100%
  }
  blockquote {
    padding: 20px;
    margin-bottom: 25px;
    background-color: #f7f7f7;
    border-left: 6px solid #b4b4b4;
    word-break: break-word !important;
    word-break: break-all;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px
  }
  blockquote p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }
  ul {
    padding: 0;
    margin: -5px 0 20px 20px
  }
  ul li {
    line-height: 30px
  }
  ul li ul {
    margin-top: 15px
  }
  pre {
    margin-bottom: 20px;
    padding: 15px;
    font-size: 13px;
    word-wrap: normal;
    word-break: break-word !important;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    border-radius: 4px
  }
  pre code {
    padding: 0;
    background-color: transparent;
    white-space: pre
  }
  code {
    padding: 2px 4px;
    background-color: #f6f6f6;
    border: none;
    font-size: 13px;
    white-space: pre-wrap;
    vertical-align: middle;
  }
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border: 0;
    // cursor: -webkit-zoom-in;
    transition: all .25s ease-in-out
  }
  p>code {
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
  table {
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    border-width: 1px;
    width: 100%;
    border-color: #e8e8e8;
    border-collapse: collapse;
  }
  table th {
    border-width: 1px;
    padding: 16px;
    border-style: solid;
    border-color: #e8e8e8;
    background-color: #fafafa;
  }
  table td {
    border-width: 1px;
    padding: 16px;
    border-style: solid;
    border-color: #e8e8e8;
    background-color: #ffffff;
  }
`

/**
 * 渲染markdown组件
 */
class Markdown extends Component {
  render() {
    const { value } = this.props
    return (
      <MarkDownContainer>
        <ReactMarkdown
          className="markdown-content"
          source={value}
          renderers={{
            code: CodeBlock,
          }}
        />
      </MarkDownContainer>
    )
  }
}

export default Markdown
