import React, { Component } from 'react'
import styled from 'styled-components'
import UserImage from '../../assets/images/kumamon.jpg'
import InlineIcons from '../common/InlineIcons';
import Config from '../../config';
import TagList from '../common/TagList';

class UserInfo extends Component {
  render() {
    const { tags } = this.props
    return (
      <UserinfoContainer>
        <Section>
          <Title>
            FEATURED TAGS
          </Title>
          <TagList tags={tags} />
        </Section>
        <Section>
          <Title>
            ABOUT ME
          </Title>
          <AboutContainer>
            <img src={UserImage} alt="头像" />
            <p>{Config.introduce}</p>
            <InlineIcons />
          </AboutContainer>
        </Section>
      </UserinfoContainer>
    )
  }
}

const UserinfoContainer = styled.div`
  width: 200px;
`

const Section = styled.section`
  border-bottom: 1px solid #eee;
  padding: 20px 0;
`

const Title = styled.h5`
  color: #808080;
  font-size: 14px;
  margin-bottom: 20px;
`

const AboutContainer = styled.div`
  img {
    width: 80%;
    display: block;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  p {
    color: #bfbfbf;
    font-size: 14px;
  }
`

export default UserInfo
