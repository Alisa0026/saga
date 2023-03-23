import { put, takeEvery } from '../../redux-saga/effects';
import * as types from '../action-types';


export function* add() {
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