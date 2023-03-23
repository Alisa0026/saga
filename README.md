# redux-saga

安装（项目已安装）：
```
npm install redux react-redux redux-saga events --save
```

执行查看：
```
npm run dev
```

# redux-saga分类
- worker saga 做具体的工作，如调用API，进行异步请求，获取异步封装结果
- watcher saga 监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
- root saga 立即启动saga的唯一入口


saga 和 thunk 都是处理副作用的

# 目录
- store
  - sagas
    - index1.js 中watcherSaga里使用了while(true)循环来不停执行，但是如果下面写其他内容永远执行不到
    - index2.js 对上面问题进行处理，支持fork，fork 开启一个新的子进程运行 workerSaga
    - index3.js 新增 taskEvery 实现可以无限执行，类似 while(true)
    - index4.js 新增call，让saga中间件调用一个函数，函数会返回 promise，然后等promise完成后继续向下执行本saga
    - index.js 新增 cps 方法，让saga中间件调用一个函数,此函数在执行结束后，回代用最后一个参数，就是callback，继续向下执行本saga