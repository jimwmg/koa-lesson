Promise.all = function (arr) {
  //1 得到传进来的参数，转化为数组
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    //2 remaining用来标识是否所有的请求都成功了
    var remaining = args.length;
    for (var i = 0; i < args.length; i++) {
      //3 对所有的promsies数组中每个元素执行res方法
      res(i, args[i]);
    };
    //res方法执行两个作用
    //1 给每个promise注册onFulfilled和onRejected函数
    //2 注意传进去的onRejected函数，这就解释了为什么当某一个promise reject的时候Promise.all(promises)注册的onRejected函数会执行
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._state === 3) {
            val = val._value;
          }
          if (val._state === 1) return res(i, val._value);
          if (val._state === 2) reject(val._value);
          //Promise.all(promsies)执行的时候
          val.then(function (val) {
            res(i, val);
          }, reject);
          //第一轮给每个promises数组中的元素注册函数执行到此结束；
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      //这里当promises数组中每一个promsie状态变为resolved的时候，会执行res(i,val)==>res(i,val._value)==>args[i] = val 此时将异步请求成功的结果放入args数组中
      // 这里处理当传入Promise.all(['a','b','c']) 不是promise的时候
      args[i] = val;
      //只有所有的promises数组中的每一个promise都异步成功了，才会进入这个if语句，进而resolve这个Promise.all(promsies)返回的promsie实例对象
      //只要有一个promsies数组中的promsie没有异步成功，就会reject这个Promise.all(promises)返回的promsie实例对象
      if (--remaining === 0) {
        resolve(args);
      }
    }
  });
};