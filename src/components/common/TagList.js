import React from 'react'
import { Tag } from 'antd'
import { randomNum } from '../../utils'
import { withRouter } from 'react-router-dom'

const rangeColorNum = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple']

function onTagClick(history, text) {
  history.push({
    pathname: `/tags/${text}`
  })
}

function rangeColor(isRange, text ,checkName) {
  if (!isRange) {
    return ''
  }
  if (checkName === text) {
    return '#40a9ff'
  }
  return rangeColorNum[randomNum(0, 10)]
}

function getStyle(color = '#888', background = 'RGB(255,255,255,0)', isRange) {
  return isRange ? { marginBottom: '8px' } : {
    marginBottom: '8px',
    color,
    background,
  }
}

const TagList = ({ history, tags = [], color, background, isRange ,checkName = ''}) => (
  <div>
    {
      tags.map((text) => (
        text && <Tag style={getStyle(color, background, isRange)} color={rangeColor(isRange, text, checkName)} key={text} onClick={() => onTagClick(history, text)}>{text}</Tag>
      ))
    }
  </div>
)


export default withRouter(TagList)
