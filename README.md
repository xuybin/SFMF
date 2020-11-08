# ice-stark-layout

## 使用

```bash
# 安装依赖
$ npm install

# 启动服务
$ npm start  # visit http://localhost:3333
```

## Faas部署(推荐)

```bash
# 部署到f.yml指定的provider name支持aliyun 或 tencent
$ npm run deploy
```

## Docker镜像部署

```bash
# 以Dockerfile打包镜像
$ docker build -t 镜像名:版本 .

# 以该镜像运行docker容器实列
$ docker run --rm 镜像名:版本
```

## 守护部署

```bash
# 以Egg做框架,打包后的程序
$ npm run package

# 以egg-scripts守护运行
$ cd .server && npm daemon

# 停止守护程序
$ cd .server && npm stop
```

[More docs](https://ice.work/docs/guide/advance/faas).

## 目录结构

- 应用配置: `src/app.js`
- 应用配置: `src/app.js`
- 路由配置: `src/routes.js`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

## 效果图

![screenshot](https://img.alicdn.com/tfs/TB14igtaVT7gK0jSZFpXXaTkpXa-2878-1368.png)
