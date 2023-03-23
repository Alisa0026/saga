function* rootSage() {
    console.log('start');
    yield { type: 'PUT', action: { type: 'ADD' } }
    // yield new Promise(resolve => setTimeout(resolve, 1000)) // 可以是promise
    // yield readFile() // 可以是函数
    yield 'delay1000' // 字符串也可以
    yield { type: 'PUT', action: { type: 'MINUS' } }
}

// 可以是函数
function readFile(callback) {
    setTimeout(callback, 1000);
}

// 执行
function runSage(saga) {
    // 自动执行saga
    // 执行生成器，返回一个迭代器
    const it = saga()
    function next() {
        // done 表示sage是否结束，value是 yeild后面跟的返回值
        const { done, value: effect } = it.next() //调用下一步
        if (!done) {// 如果done=false表示没执行完

            if (effect === 'delay1000') {
                setTimeout(next, 1000);
            }
            else if (typeof effect === 'function') {
                // 如果是函数，调用一下函数，把next当做callback传入
                effect(next)
            }
            else if (effect.type === 'PUT') {
                console.log(`向仓库派发一个动作：${JSON.stringify(effect.action)}`);
                next() // 继续下一步
            } // 判断是否promise
            else if (effect instanceof Promise) {
                effect.then(next)
            }
            else {
                next()
            }
        }
    }
    next()
}

runSage(rootSage)