import { startLoading } from '../action/index.js';

let dispatch = null

function setDispatch(value) {
  dispatch = value
}

const postImport = (importPost) => {
  return new Promise((resolve, reject) => {
    if (dispatch) {
      dispatch(startLoading(true))
    }
    importPost.then((res) => {
      resolve(res)
      if (dispatch) {
        dispatch(startLoading(false))
      }
    }).catch((error) => {
      console.log(error)
      reject(error)
      if (dispatch) {
        dispatch(startLoading(false))
      }
    })
  })
}

// 获取所有文章信息
const getPosts = (page) => postImport(import(`../assets/posts/page_${page}.json`))

// 获取tag
const getPostTags = () => postImport(import('../assets/posts/tags.json'))

// 获取文件内容
const getPostContent = (fileName) => postImport(import(`../../articles/_posts/${fileName}`))

// 获取关于
const getAbout = () => postImport(import('../../articles/about/index.md'))

// 获取头部图片
const getTitleImage = (header_img) => postImport(import(`../../articles/img/${header_img}`))

const getTagPage = () => postImport(import('../../articles/tag/index.md'))

export { setDispatch, getPosts, getPostTags, getPostContent, getAbout, getTitleImage, getTagPage }
