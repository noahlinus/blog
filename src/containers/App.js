import React, { Component } from 'react';
import HeaderLayout from '../components/HeaderLayout';
import { BackTop, Button } from 'antd'
import styled from 'styled-components'
import Routers from '../route'
import Footer from '../components/Footer';
import TopLoadBar from '../components/TopLoadBar';

class App extends Component {
  constructor() {
    super()
    this.topLoadBar = React.createRef()
  }

  beginProgress= ()=> {
    this.topLoadBar.current.beginProgress()
  }

  stopProgress= ()=> {
    this.topLoadBar.current.stopProgress()
  }

  render() {
    return (
      <div>
        <TopLoadBar ref={this.topLoadBar} />
        <HeaderLayout />
        <Container>
          <Routers />
        </Container>
        <BackTop />
        <Footer />
        <Button onClick={this.beginProgress}>开始</Button>
        <Button onClick={this.stopProgress}>结束</Button>
      </div>
    )
  }
}

const Container = styled.article`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`

export default App;
