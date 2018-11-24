import React, { Component } from 'react'
import styled from 'styled-components';

class UserInfo extends Component {
  render() {
    return (
      <UserinfoContainer>
        <Section>
          <Title>
            
          </Title>
        </Section>
      </UserinfoContainer>
    )
  }
}

const UserinfoContainer = styled.div`
  width: 200px;
  margin-top: 30px;
`

const Section = styled.section`
  display: inline-block;
  border-bottom: 1px solid #eee;
`

const Title = styled.h5`
  color: #bfbfbf;
  font-size: 14px;
`

export default UserInfo
