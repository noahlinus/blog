import ActionTypes from "./actionTypes";

export const getArticle = articles => ({
  type: ActionTypes.GET_ARTICLES,
  articles
})
