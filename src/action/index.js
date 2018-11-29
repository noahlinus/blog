import ActionTypes from "./actionTypes"
import { getIssues, getLabels, getSingleIssue } from '../api/github'

export const getArticleList = articles => async (dispatch) => {
  dispatch(startLoading(true))
  const { current, pageSize } = articles
  dispatch({ type: ActionTypes.GET_ARTICLES })
  try {
    const result = await getIssues({
      filter: 'created',
      page: current,
      per_page: pageSize,
      // labels: 'blog'
    })
    if (result.status === 200) {
      dispatch({
        type: ActionTypes.GET_ARTICLES_SUCCESS,
        articles: {
          data: result.data,
          link: result.headers.link,
          pageSize,
          current,
        }
      })
    } else {
      dispatch({ type: ActionTypes.GET_ARTICLES_FAILED })
    }
  } catch (error) {
    dispatch(startLoading(false))
    dispatch({ type: ActionTypes.GET_ARTICLES_FAILED })
  }
  dispatch(startLoading(false))
}

export const startLoading = loading => ({
  type: ActionTypes.GLOBAL_LOADING,
  loading,
})

export const getTags = () => async (dispatch) => {
  dispatch(startLoading(true))
  try {
    const res = await getLabels()
    dispatch({
      type: ActionTypes.GET_TAGS,
      tags: res.data
    })
  } catch (error) {
    dispatch(startLoading(false))
  }
  dispatch(startLoading(false))
}

export const getArticleContent = number => async (dispatch, getState) => {
  const { articles } = getState().article
  const myArticle = articles.data.filter((item) => item.number === number)
  if (myArticle.length > 0) {
    const [articleContent] = myArticle
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT, articleContent })
  } else {
    const articleContent = await getSingleIssue(number)
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT, articleContent })
  }
}
