import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderImg from '../assets/images/header-bg.jpg'

class HeaderLayout extends React.Component {
  render() {
    return (
      <Header imgSrc={HeaderImg}>
        <Navigation>
          <HomeLink to="/">Dayuan's Blog.</HomeLink>
        </Navigation>
        <HeaderContainer>
          <Title>Dayuan's Blog.</Title>
          <Remark>it's better to burn out than to fade away</Remark>
        </HeaderContainer>
      </Header>
    )
  }
}

interface IHeader {
  imgSrc: string;
}

const Navigation = styled.nav`
  position: relative;
`
const HomeLink = styled(Link)`
  color: #fff;
  padding: 20px;
  line-height: 20px;
  font-size: 18px;
  text-decoration: none;
  font-weight: 800;
`

const Header = styled.header`
  position: absolute;
  background: no-repeat center center;
  background-image: url(${(props: IHeader) => props.imgSrc});
  background-color: #666;
  width: 100%;
  background-attachment: scroll;
  text-shadow: 3px 3px 10px #000;
  background-size: cover;
`

const HeaderContainer = styled.div`
  max-width: 1000px;
  margin: 100px auto 300px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 80px;
  line-height: 1.1;
  font-weight: 700;
  color: #fff;
`

const Remark = styled.span`
  font-size: 18px;
  color: #fff;
  line-height: 1.1;
  letter-spacing: 3px;
  display: block;
  font-style: italic;
  font-weight: 100;
  margin: 10px 0 0;
`

export default HeaderLayout
