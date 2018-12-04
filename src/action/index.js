import ActionTypes from "./actionTypes"
import { getIssues, getLabels, getSingleIssue } from '../api/github'

export const getArticleList = articles => async (dispatch) => {
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
    dispatch({ type: ActionTypes.GET_ARTICLES_FAILED })
  }
}

export const startLoading = loading => ({
  type: ActionTypes.GLOBAL_LOADING,
  loading,
})

export const getTags = () => async (dispatch) => {
  try {
    const res = await getLabels()
    dispatch({
      type: ActionTypes.GET_TAGS,
      tags: res.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const getArticleContent = number => async (dispatch, getState) => {
  const { articles } = getState().article
  const myArticle = articles.data.filter((item) => item.number === number)
  console.log('myArticle', myArticle)
  if (myArticle.length > 0) {
    const [articleContent] = myArticle
    dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT, articleContent })
  } else {
    const res = await getSingleIssue(number)
    if (res.status === 200) {
      dispatch({ type: ActionTypes.GET_ARTICLE_CONTENT, articleContent: res.data })
    }
  }
}
