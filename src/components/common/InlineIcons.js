import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import Config from '../../config'

const InlineIcons = () => (
  <ListInline>
    {
      Config.userInline.map((item) => (
        <li key={item.icon}>
          <a href={item.href} target="view_window">
            <Icon type={item.icon} />
          </a>
        </li>
      ))
    }
  </ListInline>
)

const ListInline = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom:0;
  a {
    color: #bfbfbf;
    :hover{
      color: #0085a1
    }
  }
  li {
    :first-child {
      margin-left: 0;
    }
    font-size: 30px;
    margin-left: 10px;
    display: inline-block;
  }
`

export default InlineIcons
