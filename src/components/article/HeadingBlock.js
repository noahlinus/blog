import React, { Component } from 'react';
import styled from 'styled-components'

class HeadingBlock extends Component {
  state = {
    showMao: false
  }

  renderMao = (id) => <Mao show={this.state.showMao} href={`#${id}`}>#</Mao>

  handleMouseOver() {
    this.setState({ showMao: true })
  }

  handleMouseOut() {
    this.setState({ showMao: false })
  }

  render() {
    const { level, children } = this.props
    const [data] = children
    const { value } = data.props
    return (
      React.createElement(
        `h${level}`,
        {
          id: value,
          style: { position: 'relative' },
          onMouseOver: () => this.handleMouseOver(),
          onMouseOut: () => this.handleMouseOut()
        },
        value,
        this.renderMao(value)
      )
    )
  }
}

const Mao = styled.a`
  position: absolute;
  left: -45px;
  padding:0 15px;
  opacity: 0;
  transition: none;
  opacity: ${props => props.show ? 1 : 0};
  transition: ${props => props.show ? 'opacity .2s linear .2s;' : 'opacity .2s linear .2s;'};
`

export default HeadingBlock
