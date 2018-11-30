
import React from 'react'
import styled from 'styled-components'
import TagList from '../common/TagList';

const ArticleHeader = ({ title = '', date = '', tags = [] }) => (
  <HeaderContainer>
    <Title>{title}</Title>
    <TagList
      tags={tags}
    />
    <PostDate>{date}</PostDate>
  </HeaderContainer>
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
