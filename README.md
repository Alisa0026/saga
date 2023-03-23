# redux-saga

安装（项目已安装）：
```
npm install redux react-redux redux-saga --save
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