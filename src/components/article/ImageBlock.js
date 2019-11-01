import React, { Component } from 'react'

const reURL = /^(https?|ftp|file):\/\/.+$/

class ImageBlock extends Component {
  state = {
    src: '',
  }
  componentDidMount() {
    const { src } = this.props
    if (reURL.test(src)) {
      this.setState({
        src,
      })
    } else {
      import(`../../../articles/_posts/${src}`).then(res => {
        this.setState({
          src: res.default,
        })
      })
    }
  }

  componentDidUpdate(preProps) {
    const { src } = this.props
    if (src !== preProps.src) {
      if (reURL.test(src)) {
        this.setState({
          src,
        })
      } else {
        import(`../../../articles/_posts/${src}`).then(res => {
          this.setState({
            src: res.default,
          })
        })
      }
    }
  }
  render() {
    const { src } = this.state
    const { alt } = this.props
    return <img src={src} alt={alt} />
  }
}

export default ImageBlock
