import React, { Component } from 'react';
import styled from 'styled-components'
import Valine from 'valine';

class Comments extends Component {
  constructor() {
    super();
    if (!window.AV) {
      window.AV = require('leancloud-storage');
    }
  }
  componentDidMount() {
    new Valine({
      path: window.location.pathname,
      el: '#vcomments',
      appId: 'pnRY0iWjWbNHVVGt9vro1E2C-gzGzoHsz',
      appKey: 'VLSrnDsNQxaLXqkQN3XNmjGU',
      placeholder: 'Join the discussion...',
      avatar: 'retro'
    });
  }

  render() {
    return (
      <CommentsContainer id="vcomments"></CommentsContainer>
    )
  }
}

const CommentsContainer = styled.div`
  margin: 50px auto 0px;
  max-width: 800px;
`

export default Comments
