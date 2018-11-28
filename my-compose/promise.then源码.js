Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {//这些比较的都是引用地址；
    return safeThen(this, onFulfilled, onRejected);
  }
  //function noop() {}
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  //注意这里 then的链式调用，每次then函数执行完毕之后，返回值都是一个新的Promise实例对象，
  return res;
};