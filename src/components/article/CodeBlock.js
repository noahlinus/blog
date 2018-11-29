import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip, Icon } from 'antd'
import styled from 'styled-components'

/**
 * 代码块
 */
export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: null,
  }

  state = {
    copied: false,
  }

  handleCopy = () => {
    this.setState({ copied: true })
  }

  handleVisibleChange = (visible) => {
    console.log('handleVisibleChange', visible)
    if (!visible) {
      this.setState({ copied: false })
    }
  }

  render() {
    const { language, value } = this.props;
    const { copied } = this.state;
    return (
      <CodeBlockContainer className="code-block">
        <CopyToClipboard
          text={value}
          onCopy={this.handleCopy}
        >
          <Tooltip
            onVisibleChange={this.handleVisibleChange}
            placement="top"
            title={copied ? '复制成功' : '复制'}
          >
            <Icon className="icon-copy" type="copy" />
          </Tooltip>
        </CopyToClipboard>
        <SyntaxHighlighter style={atomOneDark} language={language}>
          {value}
        </SyntaxHighlighter>
      </CodeBlockContainer>
    );
  }
}

const CodeBlockContainer = styled.div`
  position: relative;
  &:hover .icon-copy {
    display: inline-block;
  }
  .icon-copy {
    display: none;
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    color: #ddd;
    &:active {
      color: #0000FF;
    }
    &:hover {
      color: #3194d0;
    }
  }
`
