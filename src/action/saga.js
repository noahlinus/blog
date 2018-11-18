import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import ActionTypes from './actionTypes';
import { getIssues } from '../api/github';

function* getArticle(action) {
  console.log('getArticle', action)

  const result = yield call(getIssues)
  console.log('getArticle', result)
  yield put({
    type: ActionTypes.GET_ARTICLES_SUCCESS,
    articles: result.data
  })
}

function* rootSaga() {
  yield takeEvery(ActionTypes.GET_ARTICLES, getArticle)
}

export default rootSaga
