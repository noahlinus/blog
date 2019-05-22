
import React, { Component } from 'react';
import styled from 'styled-components'
import TagList from '../common/TagList'
import Config from '../../config';
import { Spin } from 'antd';
import { getTitleImage } from '../../api/posts';
import headerBg from '../../../articles/img/index-bg.png'

class ArticleHeader extends Component {
  state = {
    img: headerBg,
  }

  componentDidMount() {
    const { imgSrc } = this.props
    if (imgSrc) {
      this.getTitleImage(imgSrc)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgSrc !== this.props.imgSrc) {
      const { imgSrc } = nextProps
      this.getTitleImage(imgSrc)
    }
  }

  async getTitleImage(imgSrc) {
    if (imgSrc) {
      const imageData = await getTitleImage(imgSrc)
      this.setState({
        img: imageData.default,
      })
    }
  }
  render() {
    const { title = '', date = '', tags = [], loading = false } = this.props
    const { img } = this.state
    return (
      <Header imgSrc={img}>
        <HeaderContainer>
          {
            loading ?
              <LoadingContainer>
                <Spin />
              </LoadingContainer> :
              <div>
                <TagList tags={tags} color="#fff" />
                <Title>{title}</Title>
                {date &&
                  <PostDate>
                    Posted by {Config.author} on {date}
                  </PostDate>}
              </div>
          }
        </HeaderContainer>
      </Header>
    )
  }
}
const LoadingContainer = styled.div`
  text-align: center;
  padding: 70px;
`

const HeaderContainer = styled.div`
  position: relative;
  max-width: 800px;
  padding: 150px 0;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 55px;
  line-height: 1.1;
  font-weight: 700;
  margin: 20px 0 24px;
  color: #fff;
  text-shadow: 3px 3px 10px #000;
`

const PostDate = styled.p`
  font-family: Lora,'Times New Roman',serif;
  font-style: italic;
  font-weight: 300;
  font-size: 20px;
  color: #fff;
  text-shadow: 3px 3px 10px #000;
`

const Header = styled.header`
  position: relative;
  background: no-repeat center center;
  background-image: url(${(props) => props.imgSrc});
  background-color: #ddd;
  width: 100%;
  background-attachment: scroll;
  background-size: cover;
`

// const SubTitle = styled.span`
//   font-size: 18px;
//   color: #fff;
//   line-height: 1.1;
//   letter-spacing: 3px;
//   display: block;
//   font-style: italic;
//   font-weight: 100;
//   margin: 10px 0 0;
// `

export default ArticleHeader
