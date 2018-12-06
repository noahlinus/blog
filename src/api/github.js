import axios from 'axios'
import { startLoading } from '../action';
// import { message } from 'antd'

const OWNER = 'lifesinger'//'LinYouYuan'

const REPO = 'lifesinger.github.com'//'linyouyuan.github.io'


// const OWNER = 'LinYouYuan'

// const REPO = 'linyouyuan.github.io'

// const ClinentId = '4ffdab40928a17894f95'

// const Client_Secret = 'a4d7d6f66c6458527588f307c2a7274369e4c61a'

const fetch = axios.create({
  baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/`,
})

export function inintFetch(dispatch) {
  fetch.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    dispatch(startLoading(true))
    return config;
  }, (error) => {
    // 对请求错误做些什么
    dispatch(startLoading(false))
    // message.error(error)
    return Promise.reject(error);
  });

  fetch.interceptors.response.use((response) => {
    // 对响应数据做点什么
    dispatch(startLoading(false))
    return response;
  }, (error) => {
    // 对响应错误做点什么
    dispatch(startLoading(false))
    // message.error(error)
    return Promise.reject(error);
  });
}

export const getIssues = (params) => fetch.get('/issues', { params })

export const getLabels = (params) => fetch.get('/labels', { params })

export const getSingleIssue = (number) => fetch.get(`/issues/${number}`)

export const getIssuesComments = (number, params) => fetch.get(`/issues/${number}/comments`, { params })
