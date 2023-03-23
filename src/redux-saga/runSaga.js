import * as effectTypes from './effectTypes'
/**
 * @param {*} env 环境对象，runSaga 中多了参数 env，就可以结构出 {channel, dispatch}
 * @param {*} saga 可能是个生成器，也可能是个迭代器
 */
function runSaga(env, saga) {

    let { channel, dispatch } = env;

    // 执行saga，是函数执行saga，如果是迭代器返回saga本身
    let it = typeof saga === 'function' ? saga() : saga;

    function next(value) {
        // 执行next
        let { done, value: effect } = it.next(value);
        if (!done) {
            // 如果产出指令对象是一个迭代器，会相当于开启一个新的子进程运行此迭代器
            if (typeof effect[Symbol.iterator] === 'function') {
                // 继续执行
                runSaga(env, effect);
                next();// 不会阻止当前saga继续向后走
            } // promise 实例
            else if (effect instanceof Promise) {
                effect.then(next);
            }
            else {
                // 判断动作指令类型
                switch (effect.type) {
                    case effectTypes.TAKE:
                        // 监听某个动作，用eventEmitter监听动作类型 effect.actionType，next 往下走，这里只监听一次
                        channel.once(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        // 派发动作
                        dispatch(effect.action);
                        // 同步的会立刻往下执行
                        next();
                        break;
                    default:
                        break;
                }
            }

        }
    }
    next();
}
export default runSaga