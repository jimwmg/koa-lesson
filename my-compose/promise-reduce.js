let middleWare1 = async (ctx) => {
  console.log('1 s',ctx)
  ctx.body = 'body';
  return await new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('1 e')
      
      ctx.asyncOperation = 'operation';
      // resolve(ctx);
      reject('this is 1 error')
    },2000)
  })
}
let middleWare2 = async (ctx) => {
  console.log('2 s',ctx)
  ctx.name = 'hello'
  console.log('2 e');
  return ctx
}
const resultSend3 = Promise.resolve({tag:'sendReduce'}).then(middleWare1).then(middleWare2);
resultSend3.then((data) => {
  console.log('resolve-data',data)
}).catch((data) => {
  console.log('reject-data',data)
})