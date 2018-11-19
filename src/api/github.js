import axios from 'axios'

const OWNER = 'lifesinger'

const REPO = 'lifesinger.github.com'

const fetch = axios.create({
  baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/`,
})

export const getIssues = (params) => fetch.get('/issues', { params })
