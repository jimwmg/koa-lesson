function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
let fn1 = function(ctx){
  ctx.name = "jhon";
  return ctx;
}
let fn2 = function(ctx){
  ctx.age = 15;
  return ctx;
}
let funcs = [fn1,fn2];
let conposedFn = compose(...funcs);
let result = conposedFn({})
console.log('resCompose',result);
//f1(f2(f3(...args)))
//简单理解就是
let resReduce = funcs.reduce((res,func) => {
  return func(res);
},{});
console.log('resReduce',resReduce)