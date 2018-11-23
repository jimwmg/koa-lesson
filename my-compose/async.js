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
}

const compose = new Compose();
const result = {}
compose.use(async (ctx) => {
  console.log('1 s',ctx)
  ctx.body = 'hello';
  return await new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('1 e')
      
      ctx.asyncOperation = 'operation';
      resolve(ctx);
      // reject('this is 1 error')
    })
  })
});
compose.use(async (ctx) => {
  console.log('2 s',ctx)
  ctx.name = 'hello'
  console.log('2 e');
  return ctx
});

const resultSend1 = compose.send(result).then((data) => {
  console.log('resolve-data',data)
}).catch((data) => {
  console.log('reject-data',data)
})
console.log('resultSend1',resultSend1)
