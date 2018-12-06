import ActionTypes from "./actionTypes"
import { getIssues, getLabels, getSingleIssue, getIssuesComments } from '../api/github'

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

export const getArticleContent = (number) => async (dispatch, getState) => {
  const { articles } = getState().article
  const myArticle = articles.data.filter((item) => item.number === number)
  window.scrollTo(0, 0)
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

export const getComments = (number, { current = 1, pageSize = 10 }) => async (dispatch, getState) => {
  const total = getState().article.articleContent.data.comments
  dispatch({ type: ActionTypes.GET_COMMENTS, comments: { loading: true } })
  const res = await getIssuesComments(number, {
    page: current,
    per_page: pageSize,
  })
  if (res.status === 200) {
    dispatch({ type: ActionTypes.GET_COMMENTS, comments: { data: res.data, loading: false, pagination: { current, pageSize, total } } })
  } else {
    dispatch({ type: ActionTypes.GET_COMMENTS, comments: { loading: false } })
  }
}
