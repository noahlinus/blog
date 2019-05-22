import React from 'react';
import PropTypes from 'prop-types'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomOneDark from 'react-syntax-highlighter/dist/styles/hljs/atom-one-dark'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip, Icon } from 'antd'
import styled from 'styled-components'

import js from 'react-syntax-highlighter/dist/languages/hljs/javascript'
import java from 'react-syntax-highlighter/dist/languages/hljs/java'
import json from 'react-syntax-highlighter/dist/languages/hljs/json'
import css from 'react-syntax-highlighter/dist/languages/hljs/css'
import cpp from 'react-syntax-highlighter/dist/languages/hljs/cpp'
import rust from 'react-syntax-highlighter/dist/languages/hljs/rust'
import dart from 'react-syntax-highlighter/dist/languages/hljs/dart'

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('cpp', rust);
SyntaxHighlighter.registerLanguage('dart', dart);

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
  width: 800px;
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
