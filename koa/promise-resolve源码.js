Promise.resolve = function (value) {
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