import React, { Component } from 'react';
import HeaderLayout from '../components/header/HeaderLayout'
import { BackTop } from 'antd'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Routers from '../route'
import Footer from '../components/common/Footer'
import TopLoadBar from '../components/common/TopLoadBar'

class App extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(window.location)
  }

  render() {
    const { loading } = this.props
    return (
      <Router>
        <div>
          <TopLoadBar loading={loading} />
          <HeaderLayout />
          <Container>
            <Routers />
          </Container>
          <BackTop />
          <Footer />
        </div>
      </Router>
    )
  }
}

const Container = styled.article`
  position: relative;
  margin: 0 auto;
`

const mapStateToProps = state => ({
  loading: state.global.loading,
})

export default connect(
  mapStateToProps
)(App);
