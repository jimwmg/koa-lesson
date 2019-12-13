const Koa = require('koa');
const app = new Koa();
/**
 * 1 必须调用next才会进入下一个中间件执行；
 * 2 任何一个中间件如果有return,那么compose返回的promise就会根据这个return的值进行状态变化
 * 3 
 */
app.use(async function (ctx, next) {
  console.log('async0 start');
  // return 1;
  await next();
  // await next();
  console.log('async0 end');
});

app.use(async function (ctx, next) {
  console.log('async1 start');
  ctx.body = 'two';
  // await next();
  console.log('async1 end');
});

app.use(async function (ctx, next) {
  console.log('async2 start');
  // await next();
  console.log('async2 end');
});

app.listen(3001)
console.log('server is running localhost:3000')