import axios from 'axios'

const OWNER = 'lifesinger'

const REPO = 'lifesinger.github.com'

const fetch = axios.create({
  baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/`,
  timeout: 1000
})

export const getIssues = () => fetch.get('/issues', {
  params: {
    filter: 'created',
    page: 1,
    per_page: 15,
  }
})
