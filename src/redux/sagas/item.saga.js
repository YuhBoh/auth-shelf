import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchItems() {
    try {
        const item = yield axios.get('/api/shelf');
        console.log('get shelf items:', item.data);
        yield put({ type: 'SET_ITEMS', payload: item.data });

    } catch {
        console.log('fetch item /api/shelf error', error);
    }
}

function* postItems(action) {
    try {
        const item = yield axios({
            method: "POST",
            url: '/api/shelf',
            data: action.payload
        })
        console.log('post shelf items:', item.data);
        yield put({ type: 'GET_ITEMS'});
    } catch {
        console.log('post item /api/shelf error', error);
    }
}

function* deleteItem(action) {
  try {
    const item = yield axios({
      method: "DELETE",
      url: `/api/shelf/${action.payload}`
    })
    console.log('delete shelf item:', item.data);
    yield put({ type: 'GET_ITEMS'})
  } catch {
    console.log('delete item /api/shelf/id error', error);
  }
}

function* itemsSaga() {
    yield takeEvery('GET_ITEMS', fetchItems);
    yield takeEvery('ADD_ITEMS', postItems);
    yield takeEvery('DELETE_ITEM', deleteItem)
}

export default itemsSaga;