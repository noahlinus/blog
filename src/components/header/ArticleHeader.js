
import React from 'react'
import styled from 'styled-components'
import TagList from '../common/TagList'
import HeaderImg from '../../assets/images/header-bg.jpg'
import { connect } from 'react-redux'

const ArticleHeader = ({ imgSrc = HeaderImg, title = '', date = '', tags = [] }) => (
  <Header imgSrc={imgSrc}>
    <HeaderContainer>
      <Title>{title}</Title>
      <TagList
        tags={tags}
      />
      <PostDate>{date}</PostDate>
    </HeaderContainer>
  </Header>
)

const HeaderContainer = styled.div`
  position: relative;
  max-width: 1000px;
  padding: 80px 0 300px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 55px;
  line-height: 1.1;
  font-weight: 700;
  color: #fff;
`

const PostDate = styled.p`
  font-family: Lora,'Times New Roman',serif;
  font-style: italic;
  font-weight: 300;
  font-size: 20px;
`

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
const mapStateToProps = state => (
  {
    articleContent: state.article.articleContent,
    // loading: state.global.loading
  }
)

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

export default connect(mapStateToProps)(ArticleHeader)
