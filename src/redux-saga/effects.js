import * as effectTypes from './effectTypes'
// 接收动作
export function take(actionType) {
    return { type: effectTypes.TAKE, actionType } // actionType = ASYNC_ADD
}

// 派发动作
export function put(action) {
    return { type: effectTypes.PUT, action }
}
