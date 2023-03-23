import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from '../redux-saga';
import rootSaga from './sagas';

// 执行createSagaMiddleware 返回saga中间件
let sagaMiddleware = createSagaMiddleware();
// 创建仓库
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
// 调用run方法启动rootSaga
sagaMiddleware.run(rootSaga);

window.store = store;

export default store;