import React from 'react'
import { Tag } from 'antd'
import { hexToRgba } from '../../utils';

const TagList = ({ tags, opacity = 1, textColor = "#666" }) => (
  <div>
    {tags.map((item) => (
      <Tag style={{ margin: '3px', color: textColor }} key={item.id} color={hexToRgba(item.color, opacity)}>{item.name}</Tag>
    ))}
  </div>
)

export default TagList
