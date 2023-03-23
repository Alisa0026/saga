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