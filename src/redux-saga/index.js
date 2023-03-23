import EventEmitter from 'events';
import runSaga from './runSaga';
// redux-saga 会导出一个函数 createSagaMiddleware，函数执行返回中间件

function createSagaMiddleware() {
    // 创建一个事件发生器，需要传给runSaga，定义变量boundRunSaga
    let channel = new EventEmitter(); // 事件发射器
    let boundRunSaga;

    // 中间件写法固定
    function sagaMiddleware({ getState, dispatch }) {

        // { channel, dispatch, getState }封装成对象，绑成boundRunSaga的参数。调用 boundRunSaga，第一个参数就是这个对象，第二个参数才是saga
        boundRunSaga = runSaga.bind(null, { channel, dispatch, getState });

        return function (next) {// next 是原生的 store.dispatch
            return function (action) {// 这个方法就是派发动作的方法
                // next 表示调用下一个中间件，我这个地方只是想知道派发了哪些动作，并不想拦截原来的派发逻辑
                const result = next(action);
                // 做emit发射一个事件，事件动作类型是 action.type
                channel.emit(action.type, action);

                return result;
            }
        }
    }
    // 有run方法执行saga
    sagaMiddleware.run = (saga) => boundRunSaga(saga);
    return sagaMiddleware;
}

export default createSagaMiddleware