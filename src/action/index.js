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

export const showTagContent = (key) => async (dispatch) => {
  dispatch({ type: ActionTypes.SHOW_TAGS_CONTENT, tag: { loading: true } })
  try {
    const res = await getPostTags()
    dispatch({ type: ActionTypes.SHOW_TAGS_CONTENT, tag: { tags: res.default, key, loading: false } })
  } catch (error) {
    dispatch({ type: ActionTypes.SHOW_TAGS_CONTENT, tag: { loading: false } })
    console.log(error)
  }
}

export const getArticleContent = (key) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT })
    const res = await getPostContent(`${key}.md`)
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT_SUCCESS, article: res.default })
  } catch (error) {
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT_FAILD })
  }
}
