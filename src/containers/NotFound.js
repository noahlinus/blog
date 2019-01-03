import React, { Component } from 'react'
import img from '../assets/images/page-404.jpg'
import styled from 'styled-components'

class NotFound extends Component {
  render() {
    return (
      <NotFoundContainer imgSrc={img}>
        <Title>404</Title>
        <SubTitle>你来到了没有知识的荒原 :(</SubTitle>
      </NotFoundContainer>
    )
  }
}

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: -180px;
  background: no-repeat center center;
  background-image: url(${(props) => props.imgSrc});
  width: 100%;
  height: 100%;
`

const Title = styled.h1`
  display: inline-block;
  text-align: center;
  font-size: 80px;
  margin-bottom: 0;
  color: #fff;
`

const SubTitle = styled.h2`
  display: inline-block;
  text-align: center;
  padding-bottom: 100px;
  color: #fff;
`

export default NotFound
