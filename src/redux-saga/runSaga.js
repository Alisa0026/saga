import * as effectTypes from './effectTypes'
/**
 * @param {*} env 环境对象，runSaga 中多了参数 env，就可以结构出 {channel, dispatch}
 * @param {*} saga 可能是个生成器，也可能是个迭代器
 */
function runSaga(env, saga, callback) {

    let { channel, dispatch } = env;

    // 执行saga，是函数执行saga，如果是迭代器返回saga本身
    let it = typeof saga === 'function' ? saga() : saga;

    // 因为cps 中会传err和data，这里修改next的传参为 data,isError
    function next(data, isError) {
        let result;
        if (isError) { //出错抛出异常
            result = it.throw(data);
        } else {
            // 没出错下一步
            result = it.next(data);
        }

        // 执行next
        let { done, value: effect } = result;// 这里用 result 解构

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

                    case effectTypes.FORK:
                        runSaga(env, effect.saga);//开启新的子进程，运行saga
                        next(); // 当前的saga会继续向下执行
                        break;

                    case effectTypes.CALL:
                        // 参数args传给fn,返回promise，调用then等promise成功后继续next
                        effect.fn(...effect.args).then(next);
                        break;

                    case effectTypes.CPS:
                        // 执行fn方法传参args，然后传回调,回调接收参数err(错误对象)，data(结果)
                        effect.fn(...effect.args, (err, data) => {
                            if (err) {// 出错
                                next(err, true);
                            } else { // 没出错
                                next(data);
                            }
                        });
                        break;

                    case effectTypes.ALL:
                        // 拿到 iterators 数组
                        const { iterators } = effect;
                        let result = [];
                        let count = 0; // 计数器
                        // 循环
                        iterators.forEach((iterator, index) => {
                            // 开启新的子进程，运行iterator，运行后有个回调，接收数据data
                            runSaga(env, iterator, (data) => {
                                result[index] = data;
                                // 计数器和任务总数相等任务结束
                                if (++count === iterators.length) {
                                    next(result);
                                }
                            });
                        });
                        break;
                    default:
                        break;
                }
            }

        } else {
            // 结束时，callback 存在进行调用
            callback && callback(effect)
        }
    }
    next();
}
export default runSaga