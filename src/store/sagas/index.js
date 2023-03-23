import { put, takeEvery, call, cps, all, take, fork, cancel, delay } from '../../redux-saga/effects';
import * as types from '../action-types';


export function* add() {
    // 死循环隔1s加1计数器
    while (true) {
        yield delay(1000);
        yield put({ type: types.ADD });
    }
}
export function* addWatcher() {
    // 开启新的子进程运行add
    const task = yield fork(add);
    console.log(task);
    yield take(types.STOP_ADD); // 等待停止+1的动作
    yield cancel(task); // 取消任务
}

function* rootSaga() {
    yield addWatcher();
}

export default rootSaga