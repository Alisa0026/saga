import { put, take } from 'redux-saga/effects';
import * as types from '../action-types';

function delay(ms) {
    // xxx ms以后让promise成功
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * 工作saga
 * 
 * put 就是一个指令，告诉saga中间件我要向仓库派发一个动作
 */
function* workerSaga() {
    // 先暂停1000ms
    yield delay(1000);
    // 再派发动作
    yield put({ type: types.ADD });
}

/**
 * 监听saga
 * 类比服务员，监听到请求，调用 workerSaga
 */
function* watcherSaga() {
    // 产出一个effect，等待有人向仓库派发一个 ASYNC_ADD的动作
    // 如果等不到，saga就会暂停在这里，如果等到了就会继续向下执行

    // take只能监听一次
    // yield take(types.ASYNC_ADD);
    // yield workerSaga();

    // 用for循环监听多次，或者 while(true)可以一直执行，不会死循环，会放置控制器，不执行的时候不会占用任何空间，不会消耗任何资源
    while (true) {
        yield take(types.ASYNC_ADD);
        yield workerSaga();
    }
}

/**
 * 根saga：是入口，会启动监听saga watcherSaga
 * 一个root 也可以有多个 watcher
 * yield 后面可以跟 js对象、promise、Iterator迭代器
 */
function* rootSaga() {
    // 监听saga
    yield watcherSaga();
}
export default rootSaga