import { put, takeEvery, call, cps } from '../../redux-saga/effects';
import * as types from '../action-types';


// xx ms之后调用 callback
function delay(ms, callback) {
    setTimeout(() => {
        // 回调callback参数是 err 和 data
        callback(null, 'ok');
    }, ms);
}

export function* add() {
    // 把1000作为参数传给delay，并调用delay方法，返回promise，等等promise完成再往下走
    // yield call(delay, 1000)
    yield cps(delay, 1000)
    yield put({ type: types.ADD });
}
/**
 * 根saga：是入口，会启动监听saga watcherSaga
 * 一个root 也可以有多个 watcher
 * yield 后面可以跟 js对象、promise、Iterator迭代器
 */
function* rootSaga() {
    // 监听每一次派发ASYNC_ADD的动作,然后调用add
    // 1. 不会阻塞当前saga向后执行，2.永远不会结束 类似 while(true)循环
    yield takeEvery(types.ASYNC_ADD, add)
    console.log('rootSaga next');
}
export default rootSaga