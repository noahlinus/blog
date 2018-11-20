import { call, put, takeEvery } from 'redux-saga/effects';
import ActionTypes from './actionTypes';
import { getIssues } from '../api/github';

export function* getArticle(action) {
  const { current, pageSize } = action.payload
  try {
    const result = yield call(() => getIssues({
      filter: 'created',
      page: current,
      per_page: pageSize,
      labels: 'blog'
    }))
    if (result.status === 200) {
      yield put({
        type: ActionTypes.GET_ARTICLES_SUCCESS,
        payload: {
          data: result.data,
          link: result.headers.link,
          pageSize,
          current,
        }
      })
    } else {
      yield put({type: ActionTypes.GET_ARTICLES_FAILED })
    }
  } catch (error) {
    yield put({type: ActionTypes.GET_ARTICLES_FAILED })
  }
  
}

function* rootSaga() {
  yield takeEvery(ActionTypes.GET_ARTICLES, getArticle)
}

export default rootSaga
