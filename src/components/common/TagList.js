import React from 'react'
import { Tag } from 'antd'

const TagList = (tags = []) => (
  <div>
    {
      tags.map((text) => (
        <Tag color="magenta">{text}</Tag>
      ))
    }
  </div>
)

export default TagList
