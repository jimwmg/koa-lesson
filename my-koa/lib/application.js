
'use strict';

/**
 * Module dependencies.
 */


const compose = require('./koa-compose');
const http = require('http');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

module.exports = class Application  {
  constructor() {
    this.middleware = [];
    this.context = {};
    this.request = {};
    this.response = {};
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    
    return server.listen(...args);
  }

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    this.middleware.push(fn);
    return this;
  }

  callback() {
    const fn = compose(this.middleware);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const handleError = err => onerror(err);
    const handleResponse = () => respond(ctx);
    /*重点是 fnMiddleware（ctx) 这个函数返回的promise的状态的变化，这个函数返回的状态的变化，关键是compose函数中执行结果决定的；
    */

    return fnMiddleware(ctx).then(handleResponse).catch(handleError);
  }

  createContext(req, res) {
    const context = Object.create(this.context);//{}
    context.req = req;
    context.res = res;
    return context;
  }
};

/**
 * Response helper.
 */

function respond(ctx) {
  // allow bypassing koa
  ctx.res.end(`this is my body: ==> ${ctx.body}`)
  console.log('handleResponse');
}
function onerror(err){
  console.log('handlError');
}
