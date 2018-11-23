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




/**** 
 * Promise.resolve() 源码
 * Promise.resolve = function (value) {
  //1 如果参数是一个promise实例对象，那么直接返回这个实例对象；
  if (value instanceof Promise) return value;
  //2 如果参数是基本数据类型，那么就返回基本数据类型resolve之后的实例对象；
  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;
  //3 如果参数是一个对象或者一个函数 
  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  //4 其他情况直接返回
  return valuePromise(value);
};
 * 
 * 
*/