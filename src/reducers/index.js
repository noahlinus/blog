import { combineReducers } from 'redux'
import article from './article';
import global from './global'

const reducers = combineReducers({
  global,
  article,
})

export default reducers
