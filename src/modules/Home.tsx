import * as React from 'react'
import { getIssues } from 'src/utils/github';

class Home extends React.Component {

  componentDidMount() {
    
  }

  async getTheIssues() {
    const result = await getIssues()
    
  }

  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home
