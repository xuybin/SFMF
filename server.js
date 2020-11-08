/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
const $ = require('cash');
const exec = require('child_process').exec;
const replace = require('replace');
const path = require('path');
const crypto = require('crypto');

const fs = require('fs');

function R(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, function (err, stdout, stderr) {
      if (err) {
        console.log(err);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function genServer(basePath, port) {
  const configPath = path.resolve(`${basePath}/server.js`);
  await R(`echo abc > ${configPath}`);
  replace({
    regex: 'abc',
    replacement: `const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const path = require('path');
const { handler } = require('./application.js');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  if (ctx.request.path.startsWith('/api/_')) {
    const result = await handler(ctx.request, ctx.response, ctx);
    ctx.response.res.writeHead(result.statusCode, result.headers);
    ctx.response.res.end(result.body);
  } else {
    if (!ctx.request.path.startsWith('/css/') && !ctx.request.path.startsWith('/js/')) {
      ctx.request.path = '/index.html'; // 前端是单页应用,服务端回退到首页,以支持前端路由(排除前缀/css/、/js/、/api/_ )
    }
    await next();
  }
});

app.use(
  staticCache(path.join(__dirname, 'build'), {
    maxAge: 10 * 60, //10分钟内不更新,之后携带ETag(文件的MD5)来检查是否有更新
    gzip: true
    // preload默认值true,初始化时缓存,更新时,需重启进程(一体化项目,前后端同步更新和重启)
  })
);

app.listen(${port}, () => {
  console.log('server started on http://127.0.0.1:${port}');
});`,
    paths: [configPath],
    recursive: true,
    silent: true
  });
}

function editPackage(basePath) {
  const packagePath = path.resolve(`${basePath}/package.json`);
  replace({
    regex: '"dependencies"',
    replacement: `"scripts": {
"start": "node server.js"
},
"dependencies"`,
    paths: [packagePath],
    recursive: true,
    silent: true
  });
}

(async () => {
  const basePath = '.server';
  $(`rm -r -f .serverless ${basePath}`);
  await R(`f package -z`);
  $(`mkdir ${basePath}`);
  $(`cp -r .serverless/* ${basePath}`);
  $(`rm -r -f .serverless`);
  $(`rm -r -f ${basePath}/server.js`);
  $(`rm -r -f ${basePath}/tsconfig.json`);
  $(
    `rm -r -f ${basePath}/build.json ${basePath}/*.yml ${basePath}/dist/**/*.build.json ${basePath}/dist/**/*.js.map ${basePath}/dist/**/.mwcc-cache`
  );

  await R(
    `cd ${basePath} && npm un @midwayjs/faas-middleware-static-file @midwayjs/faas-cli-plugin-midway-hooks`
  );
  await genServer(basePath, 3000);
  await editPackage(basePath);
  await R(`cd ${basePath} && npm i koa-bodyparser koa-static-cache -S`);
  console.log('package done');
  process.exit(0);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
