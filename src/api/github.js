import axios from 'axios'

const OWNER = 'lifesinger'

const REPO = 'lifesinger.github.com'

const fetch = axios.create({
  baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/`,
})

// fetch.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   console.log('在发送请求之前做些什么')
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// fetch.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   console.log('对响应数据做点什么')
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

export const getIssues = (params) => fetch.get('/issues', { params })

export const getLabels = (params) => fetch.get('/labels', { params })
