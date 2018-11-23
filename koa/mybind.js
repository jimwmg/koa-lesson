//不考虑new的形式
Function.prototype.myBind = function(thisArg,...args){
  if(typeof this !== "Function"){
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }
  let fToBind = this;
  return function(...innerArgs){
    return fToBind.apply(thisArg,args.concat(innerArgs));
  }
}

function dispatch(i){
  console.log(i)
}

let dispatchBound = dispatch.bind(null,5);

dispatchBound('otherArgs');