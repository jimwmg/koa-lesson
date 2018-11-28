//异步串行，异步并行
class Compose {
  constructor(){
    this.middleWares = [];
  }
  use(middleWare){
    if(typeof middleWare !== 'function'){
      throw new Error(`${middleWare} arguments is not a function `);
    }
    (this.middleWares || (this.middleWares = [])).push(middleWare);
  }
  send(ctx){
    let chain = this.middleWares.slice();
    if(this.middleWares.length === 0){
      throw new Error('there is no middleWare to send to');
    };
    let promise = Promise.resolve(ctx);
    while(chain.length){
      promise = promise.then(chain.shift());
      console.log('chain.length',chain.length,promise)
    };
    return promise;
  }
  //模拟实现见promise-reduce
  sendReduce(ctx){
    if(this.middleWares.length === 0){
      throw new Error('there is no middleWare to send to');
    };
    let promise = Promise.resolve(ctx);
    return this.middleWares.reduce((promise,middleWare,i) => {
      console.log('sendReduce',i)
      return promise.then(middleWare)
    },promise)
  }
  //Promise.all() 返回一个promise对象，该promise对象的状态变化主要是根据对传入的每个参数进行处理，根据 remaining 的值判断是否处理完所有的promsies值，来进行判断是否resolve  Promsie.all 返回的promsie实例对象的状态；
  sendParallel(ctx){
    return Promise.all( this.middleWares.map(middleWare => middleWare(ctx)));
  }
}

const compose = new Compose();
compose.use(async (ctx) => {
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
});
compose.use(async (ctx) => {
  console.log('2 s',ctx)
  ctx.name = 'hello'
  console.log('2 e');
  return ctx
});

// const resultSend1 = compose.send({tag:'send'}).then((data) => {
//   console.log('resolve-data',data)
// }).catch((data) => {
//   console.log('reject-data',data)
// })
/** 
 * 1 s { tag: 'send' }
 * 
 * =====2秒后======
1 e
2 s { tag: 'send', body: 'body', asyncOperation: 'operation' }
2 e
resolve-data { tag: 'send',
  body: 'body',
  asyncOperation: 'operation',
  name: 'hello' }
*/

// const resultSend2 = compose.sendParallel({tag:'sendParallel'}).then((data) => {
//   console.log('resolve-data',data)
// }).catch((data) => {
//   console.log('reject-data',data)
// })
/** 
 * 1s
 * 2s
 * 2e
 * 
 * =====2秒后======
 * 1e
 * resolve-data [ { tag: 'sendParallel',
    body: 'body',
    name: 'hello',
    asyncOperation: 'operation' },
  { tag: 'sendParallel',
    body: 'body',
    name: 'hello',
    asyncOperation: 'operation' } ]
 * 
*/

const resultSend3 = compose.sendReduce({tag:'sendReduce'}).then((data) => {
  console.log('resolve-data',data)
}).catch((data) => {
  console.log('reject-data',data)
})
