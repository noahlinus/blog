import React, { Component } from 'react'
import styled from 'styled-components'
import { Affix } from 'antd'

class ArticleMenu extends Component {
  render() {
    const { menuList } = this.props
    return (
      <Aside>
        <Affix>
          <ul>
            {
              menuList.map((item, index) =>
                <li key={`${index}`}>
                  <a href={`#${item.data}`}>{item.data}</a>
                </li>)
            }
          </ul>
        </Affix>
      </Aside>
    )
  }
}

const Aside = styled.aside`
  display: inline-block;
  position: absolute;
  margin-left: 30px;
  color: #5f5f5f;
  ul {
    list-style:none;
    padding-left: 0px;
    margin-top: 50px;
    border-left: 1px solid #666;
  } 
  li{
    margin-left: 0px;
    &:before{
      position: relative;
      top: 0;
      left: -4px;
      display: inline-block;
      width: 7px;
      height: 7px;
      content: '';
      border-radius: 50%;
      background-color: #0cc;
    }
  }
`

// const TocTitle = styled.strong`
//   font-size: 18px;
// `

export default ArticleMenu
