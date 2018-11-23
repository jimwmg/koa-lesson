const content = {};
async function middleWare0(ctx){
  //do something to operate ctx
  console.log('async0-start');
  return 1
  ctx.body = "this is body0";
  await middleWare1(ctx);
  console.log('async0 end');

}
async function middleWare1(ctx){
   //do something to operate ctx
  console.log('async1-start')
  ctx.body = ctx.body + '  this is body 1'
  await middleWare2();
  console.log('async1 end');
}
async function middleWare2(ctx){
   //do something to operate ctx
  console.log('async2-start')
  console.log('async2 end')
}
function response(ctx){
  //对中间件操作过后的响应再次进行处理；
  console.log('finalCtx',ctx)
}
function onerror(ctx){
  //错误处理
  console.log('error',ctx)
}
middleWare0(content).then(() => response(content)).catch((content) => onerror())