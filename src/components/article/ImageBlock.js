import React, { Component } from 'react';

class ImageBlock extends Component {
  state = {
    src: '',
  }
  componentDidMount() {
    const { src } = this.props
    import(`../../../articles/_posts/${src}`).then((res) => {
      this.setState({
        src: res.default,
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      const { src } = this.props
      import(`../../../articles/_posts/${src}`).then((res) => {
        this.setState({
          src: res.default,
        })
      })
    }
  }
  render() {
    const { src } = this.state
    const { alt } = this.props
    return (
      <img src={src} alt={alt} />
    )
  }
}

export default ImageBlock
