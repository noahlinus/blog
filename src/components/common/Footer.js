import React from 'react'
import styled from 'styled-components';
import moment from 'moment'
import InlineIcons from './InlineIcons';

const Footer = () => (
  <FooterContainer>
    <InlineIcons />
    <Copyright>
      Copyright © lindayuan {moment().format('YYYY')}
    </Copyright>
  </FooterContainer>
)

const FooterContainer = styled.footer`
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
  position: relative;
`

const Copyright = styled.p`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 0;
  font-style: italic;
`

export default Footer
