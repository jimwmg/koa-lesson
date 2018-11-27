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
      promise = promise.then(chain.shift())
    };
    return promise;
  }
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
      resolve(ctx);
      // reject('this is 1 error')
    },2000)
  })
});
compose.use(async (ctx) => {
  console.log('2 s',ctx)
  ctx.name = 'hello'
  console.log('2 e');
  return ctx
});

const resultSend1 = compose.send({tag:'send'}).then((data) => {
  console.log('resolve-data',data)
}).catch((data) => {
  console.log('reject-data',data)
})
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

const resultSend2 = compose.sendParallel({tag:'sendParallel'}).then((data) => {
  console.log('resolve-data',data)
}).catch((data) => {
  console.log('reject-data',data)
})
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