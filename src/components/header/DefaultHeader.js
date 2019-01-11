import React, { Component } from 'react';
import styled from 'styled-components'
import Config from '../../config'
import { getTitleImage } from '../../api/posts'
// import headerBg from '../../../articles/img/header-bg.jpg'

class DefaultHeader extends Component {
  state = {
    img: '',
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
    const { title = Config.title, subtitle = Config.subtitle } = this.props
    const { img } = this.state
    return (
      <Header imgSrc={img}>
        <HeaderContainer >
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </HeaderContainer>
      </Header>
    )
  }
}


// const LoadingContainer = styled.div`
//   text-align: center;
//   padding: 70px;
// `

const HeaderContainer = styled.div`
  position: relative;
  max-width: 1000px;
  padding: 80px 0 300px;
  margin: 0 auto;
  text-align: center;
`

const Title = styled.h1`
  font-size: 70px;
  line-height: 1.1;
  font-weight: 700;
  color: #fff;
  text-shadow: 3px 3px 10px #000;
`

const SubTitle = styled.span`
  font-size: 18px;
  color: #fff;
  line-height: 1.1;
  letter-spacing: 3px;
  display: block;
  font-style: italic;
  font-weight: 100;
  margin: 10px 0 0;
`

const Header = styled.header`
  position: relative;
  background: no-repeat center center;
  background-image: url(${(props) => props.imgSrc});
  background-color: #666;
  width: 100%;
  background-attachment: scroll;
  background-size: cover;
`

export default DefaultHeader
