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
                <AsideLi key={`${index}`} count={item.count} showIcon={item.count === 1 || item.count === 2}>
                  <a href={`#${item.data}`}>{item.data}</a>
                </AsideLi>)
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
  color: #777;
  font-weight: 700;
  ul {
    list-style:none;
    padding-left: 0px;
    margin-top: 50px;
    border-left: 1px solid #eee;
  } 
`
const AsideLi = styled.li`
  margin: 5px 0;
  a {
    color: #777;
    &:hover {
      color: #3194d0;
    }
    &:active {
      color: #51F4F0;
    }
  }
  &:before{
    position: relative;
    top: 0;
    left: -4px;
    display: inline-block;
    width: 7px;
    margin-right: ${props => props.count * 10}px;
    height: 7px;
    content: '';
    opacity:${props => props.count === 1 || props.count === 2 ? 1 : 0};
    border-radius: 50%;
    background-color: #FFE4C4;
  }
`

// const TocTitle = styled.strong`
//   font-size: 18px;
// `

export default ArticleMenu
