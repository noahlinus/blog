import React from 'react'
import styled from 'styled-components'
import Config from '../../config'

const DefaultHeader = ({ title = Config.title, subtitle = Config.subtitle }) => (
  <HeaderContainer>
    <Title>{title}</Title>
    <SubTitle>{subtitle}</SubTitle>
  </HeaderContainer>
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

export default DefaultHeader
