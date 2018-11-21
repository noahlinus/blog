import React, { Component } from 'react'
import { Progress } from 'antd'
import styled from 'styled-components';

class TopLoadBar extends Component {
  state = {
    progress: 0,
    show: true,
  }

  timeInterval = null
  myTimeout = null

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading && nextProps.loading) {
      this.beginProgress()
    } else {
      this.stopProgress()
    }
  }

  beginProgress() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
    if (this.myTimeout) {
      clearTimeout(this.myTimeout)
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
      if (willProgress < 35) {
        temp = 1
      } else if (willProgress > 35) {
        temp = 0.3
      }
      if (willProgress >= 90) {
        clearInterval(this.timeInterval)
        // this.stopProgress()
      }
    }, 40)
  }

  stopProgress() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
    if (this.myTimeout) {
      clearTimeout(this.myTimeout)
    }
    let temp = 1
    this.setState({
      progress: 90
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
          show: false
        }, () => {
          this.myTimeout = setTimeout(() => {
            console.log('myTimeout')
            this.setState({
              progress: 0
            })
          }, 1000);
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
          strokeWidth={5}
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
  transition: ${props => props.show ? 'none' : 'opacity .4s linear .4s;'};
  .ant-progress-inner {
    background-color: transparent;
  }
`

export default TopLoadBar
