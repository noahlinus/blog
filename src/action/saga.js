import { call, put, takeEvery } from 'redux-saga/effects';
import ActionTypes from './actionTypes';
import { getIssues } from '../api/github';

export function* getArticle(action) {
  const result = yield call(() => getIssues({
    filter: 'created',
    page: 1,
    per_page: 15,
    labels: 'blog'
  }))
  yield put({
    type: ActionTypes.GET_ARTICLES_SUCCESS,
    articles: result.data
  })
}

function* rootSaga() {
  yield takeEvery(ActionTypes.GET_ARTICLES, getArticle)
}

export default rootSaga
