import React, { Component } from 'react'
import { Timeline } from 'antd'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'


class TagContent extends Component {
  handleClick(key) {
    this.props.history.push({
      pathname: `/article/${key}`
    })
  }

  renderTags(tags) {
    return tags.map((tag) => {
      return (
        <TagSection key={tag.key}>
          <Year>{tag.key}</Year>
          <Timeline>
            {
              tag.data.map((item) => {
                const key = item.key.replace('.md', '')
                const date = item.date.substring(0, 10)
                return (
                  <Timeline.Item key={key} >
                    <span> <TimeSpan>{date}</TimeSpan><TitleSpan onClick={() => this.handleClick(key)}>{key}</TitleSpan> </span>
                  </Timeline.Item>
                )
              })
            }
          </Timeline>
        </TagSection>
      )
    })
  }
  render() {
    const { tags } = this.props
    return (
      <Container>
        {this.renderTags(tags)}
      </Container>
    )
  }
}

const TimeSpan = styled.span`
  font-size: 15px;
  color: #777;
`

const TitleSpan = styled.span`
  font-size: 16px;
  margin-left: 30px;
  color: #555;
  cursor:pointer;
  :hover {
    color: #3194d0;
  }
  :active {
    color: #1270ea;
  }
`

const Container = styled.div`
  margin-top: 30px;
`

const TagSection = styled.section`
  .ant-timeline-item-last{
    padding: 0;
  }
`

const Year = styled.p`
  color: #1890ff;
  font-size: 18px;
  font-weight: 500;
`


export default withRouter(TagContent)
