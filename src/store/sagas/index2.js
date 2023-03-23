import { put, take, fork } from '../../redux-saga/effects';
import * as types from '../action-types';

function delay(ms) {
    // xxx ms以后让promise成功
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * 工作saga：是做具体工作的，具体是啥自己来实现
 * 
 * put 就是一个指令，告诉saga中间件我要向仓库派发一个动作
 * 
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

    yield take(types.ASYNC_ADD);
    // fork 开启一个新的子进程运行 workerSaga
    yield fork(workerSaga)

    console.log('watcherSaga next');
}

/**
 * 根saga：是入口，会启动监听saga watcherSaga
 * 一个root 也可以有多个 watcher
 * yield 后面可以跟 js对象、promise、Iterator迭代器
 */
function* rootSaga() {
    // 监听saga
    yield watcherSaga(); // 里面有while循环永远执行不完，但是不耽误后面执行
    console.log('rootSage next');
}
export default rootSaga