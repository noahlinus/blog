import { call, put, takeEvery } from 'redux-saga/effects';
import ActionTypes from './actionTypes';
import { getIssues, getLabels } from '../api/github';
import { changeGlobalLoading } from '.';

function* getArticle(action) {
  yield startLoading(true)
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
      yield put({ type: ActionTypes.GET_ARTICLES_FAILED })
    }
  } catch (error) {
    yield put({ type: ActionTypes.GET_ARTICLES_FAILED })
  }
  yield startLoading(false)
}

function* getTags(action) {
  const res = yield call(() => getLabels()) 
  console.log(res)
} 

function* startLoading(isLoading) {
  yield put(changeGlobalLoading(isLoading))
}

function* watchFetchProducts() {
  yield takeEvery(ActionTypes.GET_ARTICLES, getArticle)
  yield takeEvery(ActionTypes.GET_TAGS, getTags)
}

function* rootSaga() {
  yield watchFetchProducts()
}

export default rootSaga
