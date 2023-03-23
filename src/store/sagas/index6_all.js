import { take, put, takeEvery, call, all } from '../../redux-saga/effects';
import * as types from '../action-types';

export function* add1() {
    for (let i = 0; i < 1; i++) {
        yield take(types.ASYNC_ADD);
        yield put({ type: types.ADD });
    }
    console.log('add1 done ');
    return 'add1Result';
}

export function* add2() {
    for (let i = 0; i < 2; i++) {
        yield take(types.ASYNC_ADD);
        yield put({ type: types.ADD });
    }
    console.log('add2 done ');
    return 'add2Result';
}

function* rootSaga() {
    let result = yield all([add1(), add2()])
    console.log('done', result);
}
export default rootSaga