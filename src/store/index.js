import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// 创建saga中间件
let sagaMiddleware = createSagaMiddleware();
// 创建仓库
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
// 运行saga
sagaMiddleware.run(rootSaga);

window.store = store;

export default store;