// 指令类型
// 监听某个动作的派发
export const TAKE = 'TAKE';
// 向仓库派发某个动作
export const PUT = 'PUT';
// 开启一个新的子进程
export const FORK = 'FORK';
// 让saga中间件调用一个函数，函数会返回 promise，然后等promise完成后继续向下执行
export const CALL = 'CALL';