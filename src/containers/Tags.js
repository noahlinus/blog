import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showTagContent } from '../action'
import { getTagPage } from '../api/posts'
import DefaultHeader from '../components/header/DefaultHeader'
import TagList from '../components/common/TagList'
import styled from 'styled-components'
import { Spin } from 'antd';
import TagContent from '../components/tag/TagContent';

const SHOW_ALL = 'Show All'

class Tags extends Component {
  state = {
    data: {
      title: '',
      subtitle: '',
      header_img: '',
    },
    loading: false,
  }

  componentDidMount() {
    this.getTagMsg()
    let name = this.props.location.pathname
    name = name.replace('/tags/', '')
    if (!name) {
      name = SHOW_ALL
    }
    this.props.showTagContent(name)
  }

  componentWillReceiveProps(nextProps) {
    let name = nextProps.location.pathname
    name = name.replace('/tags/', '')
    let oldName = this.props.location.pathname
    oldName = oldName.replace('/tags/', '')
    if (name !== oldName) {
      if (!name) {
        name = SHOW_ALL
      }
      this.props.showTagContent(name)
    }
  }
  async getTagMsg() {
    this.setState({ loading: true })
    const res = await getTagPage()
    this.setState({
      data: res.default,
      loading: false,
    })
  }

  getTags = tags => {
    const res = Object.keys(tags).map(text => text)
    res.unshift(SHOW_ALL)
    return res
  }

  render() {
    const { tags, tagContent, location } = this.props
    const { data } = this.state
    let name = location.pathname
    name = name.replace('/tags/', '')
    if (!name) {
      name = SHOW_ALL
    }
    return (
      <div>
        <DefaultHeader
          title={data.title}
          subtitle={data.subtitle}
          imgSrc={data.header_img}
        />
        <TagContainer>
          {
            tagContent.loading ?
              <LoadingContainer>
                <Spin />
              </LoadingContainer> :
              <div>
                <TagList
                  tags={this.getTags(tags)}
                  isRange
                  checkName={name}
                />
                <TagContent tags={tagContent.data} />
              </div>
          }
        </TagContainer>
      </div>
    )
  }
}

const LoadingContainer = styled.div`
  text-align:center;
`

const TagContainer = styled.div`
  margin: 30px auto 0px;
  width: 800px;
`

const mapStateToProps = state => ({
  tags: state.article.tags,
  tagContent: state.article.tagContent,
})

const mapDispatchToProps = dispatch => ({
  showTagContent: (key) => dispatch(showTagContent(key)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tags)
