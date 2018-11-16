import React, { Component } from 'react'
import { getIssues } from '../api/github';

class Home extends Component {
  state = {
    issues: [],
  }

  componentDidMount() {
    this.getIssues()
  }

  async getIssues() {
    const result = await getIssues({ page: 1, per_page: 15 })
    console.log('lailailai',result)
    this.setState({ issues: result.data })
  }

  render() {
    const { issues } = this.state
    return (
      <div>
        <ul>
          {
            issues.map((item) => <li>{item.title}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default Home
