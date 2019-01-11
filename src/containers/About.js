import React, { Component } from 'react'
import DefaultHeader from '../components/header/DefaultHeader'
import styled from 'styled-components'
import Markdown from '../components/article/Markdown';
import { Spin } from 'antd';
import { getAbout } from '../api/posts';

class About extends Component {
  state = {
    data: {
      title: '',
      subtitle: '',
      header_img: '',
      content: '',
    },
    loading: false,
  }

  componentDidMount() {
    this.getAboutMsg()
  }

  async getAboutMsg() {
    this.setState({loading: true})
    const res = await getAbout()
    this.setState({
      data: res.default,
      loading: false,
    })
  }

  render() {
    const { data, loading } = this.state
    return (
      <div>
        <DefaultHeader
          title={data.title}
          subtitle={data.subtitle}
          imgSrc={data.header_img}
        />
        <ContentContainer>
          {loading ?
            <LoadingContainer>
              <Spin />
            </LoadingContainer> :
            <AbaoutContent>
              <Markdown
                value={data.content}
              />
            </AbaoutContent>}
        </ContentContainer>
      </div>
    )
  }
}

const ContentContainer = styled.article`
  position: relative;
  margin-top: 20px;
`

const AbaoutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 70px;
`

export default About
