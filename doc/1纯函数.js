/**
 * pure function 纯函数
 * 就是没有副作用的函数
 * 副作用就是发生了一些函数外部可观察到的变化
 * 
 * 1. 输出依赖输出入,不依赖外部变量
 * 2. 不能修改函数作用域之外的变量
 */
// 下面是纯函数
function sum(a, b) {
    return a + b
}

// 下面依赖外部变量就不是纯函数
let prefix = '$'
function sum1(a, b) {
    return prefix + a + b
}
sum1(1, 2)
prefix = '元'
sum1(1, 2)