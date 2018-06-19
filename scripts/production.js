'strict';
process.env.NODE_ENV = 'production';

const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path')
const static = require('koa-static')

const staticPath = '../build/'


app.use(static(
    path.join( __dirname,  staticPath)
))

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
});

app.listen(8084);