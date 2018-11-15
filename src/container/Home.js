import React, { Component } from 'react'
import { getIssues } from '../api/github';

class Home extends Component {
  state = {
    issues: [],
  }

  componentDidMount() {
    getIssues()
  }

  async getIssues() {
    const result = await getIssues({ page: 1, per_page: 15 })
    this.setState({ issues: result })
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
