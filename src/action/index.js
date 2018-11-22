import ActionTypes from "./actionTypes";

export const getArticle = payload => ({
  type: ActionTypes.GET_ARTICLES,
  payload,
})

export const changeGlobalLoading = loading => ({
  type: ActionTypes.GLOBAL_LOADING,
  loading,
})
