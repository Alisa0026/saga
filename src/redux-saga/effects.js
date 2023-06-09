import * as effectTypes from './effectTypes'
// 接收动作
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType } // actionType = ASYNC_ADD
}

// 派发动作
export function put(action) {
    return { type: effectTypes.PUT, action }
}

// “开启新的子进程”（这里是比喻，是重头开始执行saga的意思，不是真的新子进程）运行saga
export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

export function takeEvery(actionType, saga) {

    function* takeEveryHelper() {
        // 本身还是while(true)
        while (true) {
            yield take(actionType); // 等待有人向仓库派发此动作
            yield fork(saga); // 派发后，再开启一个新的子进程允许此saga
        }
    }
    // 开启一个新的子进程，运行 takeEveryHelper
    return fork(takeEveryHelper);
}

export function call(fn, ...args) {
    // args 是传给 fn 的参数
    return { type: effectTypes.CALL, fn, args };
}

export function cps(fn, ...args) {
    return { type: effectTypes.CPS, fn, args };
}

// 接收 iterators 是数组
export function all(iterators) {
    return { type: effectTypes.ALL, iterators };
}

// 取消任务
export function cancel(task) {
    return { type: effectTypes.CANCEL, task };
}

const delayFn = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
export function delay(...args) {
    return call(delayFn, ...args);
}