//async 函数返回一个promise对象,和 Promise.resolve() 返回的对象状态：该promise对象的状态由其内部代码返回的值决定；
//如果返回的不是一个promise对象，那么async函数返回的promise对象将是一个直接resolve了的promise对象；
//如果返回一个promsie对象，那么async函数返回的promise对象和它内部代码返回的promsie的对象一致
function next(){

}
async function middleWare1(){
  next();
  // return 1;
  return Promise.resolve();
}
middleWare1().then((data) => {
  console.log('async-data-resolve',data)
}).catch((data) => {
  console.log('async-data-reject',data)
})

function fn(){
  // next()
  return 1;
  return Promise.reject()
}
Promise.resolve(fn()).then((data) => {
  console.log('promise.resolve-data',data)
}).catch((data) => {
  console.log('promise-reject-data',data)
})



