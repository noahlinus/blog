import React from 'react'
import styled from 'styled-components'
import Config from '../../config'
import HeaderImg from '../../assets/images/header-bg.jpg'

const DefaultHeader = ({ imgSrc = HeaderImg, title = Config.title, subtitle = Config.subtitle }) => (
  <Header imgSrc={imgSrc}>
    <HeaderContainer >
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </HeaderContainer>
  </Header>
)

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
