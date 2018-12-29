import ActionTypes from "./actionTypes"
import { getPosts, getPostTags, getPostContent } from "../api/posts";

export const getArticleList = articles => async (dispatch) => {
  const { current } = articles
  dispatch({ type: ActionTypes.GET_ARTICLES })
  try {
    const result = await getPosts(current)
    dispatch({
      type: ActionTypes.GET_ARTICLES_SUCCESS,

      articles: { ...result.default }
    })
  } catch (error) {
    dispatch({ type: ActionTypes.GET_ARTICLES_FAILED })
  }
}

export const startLoading = loading => ({
  type: ActionTypes.GLOBAL_LOADING,
  loading,
})

export const getTags = () => async (dispatch) => {
  try {
    const res = await getPostTags()
    dispatch({
      type: ActionTypes.GET_TAGS,
      tags: res.default
    })
  } catch (error) {
    console.log(error)
  }
}

export const getArticleContent = (key) => async (dispatch) => {
  const res = await getPostContent(key)
  dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT, article: res.default })
  window.scrollTo(0, 0)
}

export const getComments = (number, { current = 1, pageSize = 10 }) => async (dispatch, getState) => {
  // const total = getState().article.articleContent.data.comments
  // dispatch({ type: ActionTypes.GET_COMMENTS, comments: { loading: true } })
  // const res = await getIssuesComments(number, {
  //   page: current,
  //   per_page: pageSize,
  // })
  // if (res.status === 200) {
  //   dispatch({ type: ActionTypes.GET_COMMENTS, comments: { data: res.data, loading: false, pagination: { current, pageSize, total } } })
  // } else {
  //   dispatch({ type: ActionTypes.GET_COMMENTS, comments: { loading: false } })
  // }
}
