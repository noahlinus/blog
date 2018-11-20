import ActionTypes from "./actionTypes";

export const getArticle = payload => ({
  type: ActionTypes.GET_ARTICLES,
  payload,
})
