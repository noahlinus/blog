import React from 'react'
import { Tag } from 'antd'

const TagList = ({ tags }) => (
  <div>
    {tags.map((item) => (
      <Tag style={{ margin: '3px', color: '#666' }} key={item.id} color={`#${item.color}`}>{item.name}</Tag>
    ))}
  </div>
)

export default TagList
