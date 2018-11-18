import ActionTypes from "../action/actionTypes";

const initArticle = {
  articles: [],
}

const article = (state = initArticle, action)=> {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
      }
    default:
      return state
  }
}

export default article
