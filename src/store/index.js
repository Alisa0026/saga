import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas';

// let sagaMiddleware = createSagaMiddleware();
// 创建仓库
let store = applyMiddleware()(createStore)(reducer);
// sagaMiddleware.run(rootSaga);

window.store = store;

export default store;