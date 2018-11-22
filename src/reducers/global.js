import ActionTypes from "../action/actionTypes";

const initGlobal = {
  loading: false
}

const global = (state= initGlobal, action) => {
  switch (action.type) {
    case ActionTypes.GLOBAL_LOADING:
      return {
        loading: action.loading
      }
    default:
      return state
  }
}

export default global
