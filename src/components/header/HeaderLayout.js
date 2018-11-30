import React from 'react'

import styled from 'styled-components';
import HeaderImg from '../../assets/images/header-bg.jpg'
import Navigation from './Navigation';
import DefaultHeader from './DefaultHeader';
import ArticleHeader from './ArticleHeader';

const HeaderLayout = ({titleData = {} }) => (
  <Header imgSrc={titleData.img || HeaderImg}>
    <Navigation />
    {
      !titleData.isSingleArticle ?
        <DefaultHeader
          title={titleData.title}
          subtitle={titleData.subtitle}
        /> :
        <ArticleHeader
          title={titleData.title}
          date={titleData.date}
          tags={titleData.tags}
        />
    }
  </Header>
)

const Header = styled.header`
  position: relative;
  background: no-repeat center center;
  background-image: url(${(props) => props.imgSrc});
  background-color: #666;
  width: 100%;
  background-attachment: scroll;
  text-shadow: 3px 3px 10px #000;
  background-size: cover;
`

export default HeaderLayout
