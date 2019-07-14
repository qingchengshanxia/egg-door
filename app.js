'use strict';
// server: 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者。
// error: 运行时有任何的异常被 onerror 插件捕获后，都会触发 error 事件，将错误对象和关联的上下文（如果有）暴露给开发者，可以进行自定义的日志记录上报等处理。
// request 和 response: 应用收到请求和响应请求时，分别会触发 request 和 response 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录。

module.exports = app => {
    // app.cache = new Cache();

    // app.once('server', server => {
    //     // websocket
    // });
    // app.on('error', (err, ctx) => {
    //     // report error
    // });
    // app.on('request', ctx => {
    //     // log receive request
    // });
    // app.on('response', ctx => {
    //     // ctx.starttime is set by framework
    //     // log total cost
    // });
};