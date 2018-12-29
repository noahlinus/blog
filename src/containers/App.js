import React, { Component } from 'react';
import { BackTop } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Routers from '../route'
import Navigation from '../components/header/Navigation'
import Footer from '../components/common/Footer'
import TopLoadBar from '../components/common/TopLoadBar'
import MarkdownTest from '../test/MarkdownTest';

const TEST_MK = false

class App extends Component {
  render() {
    if (TEST_MK) {
      return <MarkdownTest />
    }
    const { loading } = this.props
    return (
      <Router>
        <div>
          <TopLoadBar loading={loading} />
          <Routers />
          <Navigation />
          <BackTop />
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.global.loading,
})

export default connect(
  mapStateToProps
)(App);
