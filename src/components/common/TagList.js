import React from 'react'
import { Tag } from 'antd'

function onTagClick(text) {
  console.log(text)
}


const TagList = ({ tags = [] }) => (
  <div>
    {
      tags.map((text) => (
        text && <Tag style={{ marginBottom: '8px' }} color="blue" key={text} onClick={() => onTagClick(text)}>{text}</Tag>
      ))
    }
  </div>
)

export default TagList
