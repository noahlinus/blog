import React, { Component } from 'react'
import { Progress } from 'antd'
import styled from 'styled-components';

class TopLoadBar extends Component {
  state = {
    progress: 0,
    show: true,
  }

  timeInterval = null

  beginProgress() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
    let temp = 0.5
    this.setState({
      progress: 0,
      show: true,
    })
    this.timeInterval = setInterval(() => {
      const { progress } = this.state
      let willProgress = progress + temp
      this.setState({
        progress: willProgress,
      })
      if (willProgress < 25) {
        temp = 0.6
      }
      if (willProgress > 25) {
        temp = 0.2
      }
      if (willProgress >= 85) {
        clearInterval(this.timeInterval)
        // this.stopProgress()
      }
    }, 40)
  }

  stopProgress() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
    let temp = 0.8
    this.setState({
      progress: 85
    })
    this.timeInterval = setInterval(() => {
      const { progress } = this.state
      let willProgress = progress + temp
      this.setState({
        progress: willProgress,
      })
      if (willProgress >= 100) {
        clearInterval(this.timeInterval)
        this.setState({
          show: false,
        })
      }
    }, 40)
  }

  render() {
    const { progress, show } = this.state
    return (
      <TopLoadBarContainer show={show}>
        <Progress
          percent={progress}
          strokeLinecap="square"
          status="active"
          strokeWidth="5px"
          showInfo={false}
        />
      </TopLoadBarContainer>
    )
  }
}

const TopLoadBarContainer = styled.div`
  position: fixed;
  top: -10px;
  width: 100%;
  z-index: 40;
  left: 0;
  opacity: ${props => props.show ? 1 : 0};
  transition: ${props => props.show ? 'opacity .2s linear .2s;' : 'opacity .4s linear .4s;'};
  .ant-progress-inner {
    background-color: transparent;
  }
`

export default TopLoadBar
