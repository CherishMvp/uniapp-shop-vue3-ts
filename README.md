## 家禽项目简介

### 项目说明

家禽预定体系包含五个端：微信小程序端，H5 端，App 端，PC 端，管理后台。

当前仓库是 **uni-app** 开发的**微信小程序端**，通过**条件编译**能兼容 **H5 端** 和 **App 端**。

### 在线体验

<table>
  <tr>
    <td>体验小程序端</td>
    <td><a target="_blank" href="https://megasu.gitee.io/uniapp-shop-vue3-ts/">体验 H5 端</a></td>
    <td><a target="_blank" href="https://gitee.com/Megasu/uniapp-shop-vue3-ts/releases/download/v1.0.0/heima-shop.apk">体验 App 端(安卓)</a></td>
  </tr>
  <tr>
    <td><img width="300" src="./README/images/code-mp-weixin.png" alt=""></td>
    <td><img width="300" src="./README/images/code-h5.png" alt=""></td>
    <td><img width="300" src="./README/images/code-android.png" alt=""></td>
  </tr>
</table>

## 资料说明

### 📀 视频学习

[https://www.bilibili.com/video/BV1Bp4y1379L/](https://www.bilibili.com/video/BV1Bp4y1379L/?share_source=copy_web&vd_source=2ac50d29193927b3c8597537dc4bc81d)

### 📗 接口文档

[https://www.apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/](https://www.apifox.cn/apidoc/shared-0e6ee326-d646-41bd-9214-29dbf47648fa/)

### ✏️ 在线笔记

[https://megasu.gitee.io/uni-app-shop-note/](https://megasu.gitee.io/uni-app-shop-note/)

### 📦 项目源码

[https://gitee.com/Megasu/uniapp-shop-vue3-ts/](https://gitee.com/Megasu/uniapp-shop-vue3-ts/)

### 项目架构

![项目架构图](./README/images/project_structure.png)

## 项目演示

### 在线演示

项目已上线，微信搜索小程序 **家禽预定** 即可体验。

### 项目截图

<table>
  <tr>
    <td><img width="100" src="./README/images/screenshot_1.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_2.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_3.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_4.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_5.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_6.jpg" alt=""></td>
  </tr>
  <tr>
    <td><img width="100" src="./README/images/screenshot_7.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_8.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_9.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_10.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_11.jpg" alt=""></td>
    <td><img width="100" src="./README/images/screenshot_12.jpg" alt=""></td>
  </tr>
</table>

## 家禽预定-微信小程序

### 项目简介

微信小程序端：该项目包含了从首页浏览商品，到商品详情，微信登录，加入购物车，提交订单，微信支付，订单管理等功能。

### 技术栈

- 前端框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS)
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件库：[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

### 项目模块

- 项目起步
- 首页模块
- 推荐模块
- 分类模块
- 详情模块
- 登录模块
- 用户模块
- 地址模块
- SKU 模块
- 购物车模块
- 订单模块
- 项目打包

### 开发环境

- Windows 版本： Windows 11 家庭中文版
- 开发工具： VS Code 、 HbuilderX 、 微信开发者工具
- Node 版本： v16.15.0
- pnpm 版本：v8.6.10

### 运行程序

1. 安装依赖

```shell
# npm
npm i --registry=https://registry.npmmirror.com

# pnpm
pnpm i --registry=https://registry.npmmirror.com
```

2. 运行程序

```shell
# 微信小程序端
npm run dev:mp-weixin

# H5端
npm run dev:h5

# App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器
```

3. 微信开发者工具导入 `/dist/dev/mp-weixin` 目录

### 工程结构解析

```
├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── components             # 全局组件
│   ├── composables            # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── category            # 分类页
│       ├── cart                # 购物车
│       ├── my                  # 我的
│       ├── goods               # 商品详情
│       └── hot                 # 热门推荐
│       └── login               # 登录页
│   ├── pagesMember            # 分包页面(用户模块)
│       ├── address             # 地址管理
│       ├── address-form        # 地址表单
│       ├── profile             # 用户信息
│       └── settings            # 用户设置
│   ├── pagesOrder             # 分包页面(订单模块)
│       ├── create              # 创建订单
│       ├── detail              # 订单详情
│       ├── list                # 订单列表
│       └── payment             # 支付结果
│   ├── services               # 所有请求
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```

# 2023-08-16 16:42:33

- 主题色配置

# 2023-08-22 11:34:22

- `git reset Head^1`撤回本地 commit 放回本地暂存区

# 2023-08-22 11:44:35

git Husky 搭配 commitizen ，规范代码提交;参考链接`https://blog.csdn.net/weixin_47980825/article/details/127473686`

- husky 介绍
  husky 可以帮助我们在 执行 git commit 提交的时候，按照 eslint 规范进行修复代码。
  husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push 支持所有的 Git 钩子
  - 安装与配置
    - `npx husky-init && npm install`
    - 会在 .husky/pre-commit 生成一个测试命令（在 git commit -m''执行之前执行）
- Commitizen 来帮助我们规范提交代码。
  - Commitizen 是一个帮助我们编写规范 commit message 的工具。
  - 安装
    - `npm install commitizen -D`2023-09-13 09:28:35
  - 安装 cz-conventional-changelog - `npx commitizen init cz-conventional-changelog --save-dev --save-exact`
  - package.json 配置 config：
    - ` "config": { "commitizen": { "path": "./node_modules/cz-conventional-changelog" }}`
- 测试
  - `npx cz`
  - 格式：本次修改范围 - 选择提交信息 - 详细描述信息 - 是否是重大修改 - 是否影响 open issue（如 codeup 云效）
- 添加脚本
- `"commit":"cz" `
- 阻止不规范提交
  - 安装`@commitlint/config-conventional 和 @commitlint/cli`
  - 在根目录创建` commitlint.config.js` 文件，配置 `commitlint`
  - 使用 husky 生成 commit-msg 文件，验证提交信息： - `npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`

# 2023 年 9 月 13 日

- master 下关闭 GitHub 和 gitee 托管

# 2023-09-14 18:28:12

- 开全局 clshx 代理，但是 github 在 push 的时候还是不走，要设置 proxy
  `git config --global http.proxy socks5://127.0.0.1:1080`
  `git config --global https.proxy socks5://127.0.0.1:1080`
- 新增无权限处理方法
  - 参考链接:`https://blog.csdn.net/the__future/article/details/130038818`

# 2023-09-14 22:11:27

- 如有必要，对 uniapp 自定义组件进行样式穿透
  1. 语言要一样 <script lang="ts">
     export default {
     options: { styleIsolation: 'shared' },
     }
  2. 结构<div class="mysection">
     <uni-section :title="'选择客户姓名'" type="line" />
     </div>
  3. scoped 下有:deep(.uni-section-header\_\_content) {
     color: #27ba9b !important;
     font-size: 25px !important;
     }
  4. 加上前缀，可以指定类下的内置样式修改.mysection :deep(.uni-section-header\_\_content) {
     color: #27ba9b !important;
     font-size: 25px !important;
     background-color: #cf4444;
     }
- 掌握骨架片转 vue 文件的用法，暂时不需要使用
- 要注意不要一直揪着样式不放，很容易浪费时间

# 2023-09-15 23:25:51

- vue 中，表单输入框的 type 属性是用于控制输入框接受的数据类型，但输入的值仍然以字符串的形式被绑定到数据模型中。

# 2023-09-16 14:58:13

- 使用`uni-data-checkbox`组件，需要更新 uni-ui 到 1.4.28 版本，组件不存在就可以考虑升级版本

# 2023-09-16 20:32:37

- 校验代码

# 2023-09-18 11:02:10

- <XtxGuess/>未删减版本见 commmit `788812843d99b82cdec4c0d9360c523dc061510es`
- 要拉取指定的 commit 版本内容，您可以使用 Git 命令 `git checkout`。这将使您的工作目录和索引状态回到特定 commit 时的状态，您可以查看该 commit 的内容并进行修改或分析。

以下是基本的步骤：

1. 首先，使用以下命令列出 commit，以查找您想要拉取的 commit 的哈希值：

   `bash git log `

   从输出中找到您想要的 commit，记录其哈希值（通常是一串类似于 `commit 1234567890abcdef` 的字符）。

2. 使用 `git checkout` 命令切换到特定 commit。假设哈希值是 `1234567890abcdef`：
   `bash git checkout 1234567890abcdef `

   这将将您的工作目录和索引状态切换到指定 commit 的状态。

3. 现在您可以查看或修改该 commit 的内容。

如果您只想查看特定 commit 的内容，而不切换到该 commit，可以使用以下命令：

`bash git show 1234567890abcdef `

这将显示该 commit 的详细信息，包括提交的消息和修改的内容。

请注意，在切换到特定 commit 后，您处于“分离头指针”状态，任何在这种状态下的修改将不会影响到分支上。如果需要在特定 commit 上进行修改并将其保存为新 commit，您可能需要创建一个新分支。

# 2023-09-18 11:17:27

- 可以使用伪元素设置金额前缀

  - .amount {
    font-size: 20px;
    color: #cf4444;

  .decimal {
  font-size: 12px;
  }

  &::before {
  content: '￥';2023-09-23 15:33:22
  font-size: 12px;
  }
  }

- 要注意如果有设置 fix 底部 actionbar 此类的，屏幕高度要设为 100vh 撑满

#

- 本地和线上的 url 并没有完全统一，还在测试环境，其中 user/code 相关的，直接使用了 setting 中的 pro 版本
  因为 inject 使用全局变量会有问题，可能会读不到

# 2023-09-26 15:35:34

- 首页 banner 图片像素推荐：1240 x 500px;分类页面像素推荐 750 x 225px;分类小图 800 x 800px

# 2023-09-26 18:57:39

- 一定要注意，小程序中一定要是 https 的请求。我用了 cloudflare 配的 dns，用了他们的证书，要开启代理才能用 https

# 2023-09-26 19:34:48

- 小程序上传需要先在 uniapp 这使用 cli 的 build 打包下，然后再通过开发者工具打开。再进行上传。
- 如果会出现类似--- PLACEHOLDER PACKAGE ---
  This @babel/plugin-proposal-private-property-in-object version is not meant to
  be imported. Something is importing
  @babel/plugin-proposal-private-property-in-object
  这种错误，可以在源项目中先安装`pnpm i @babel/plugin-proposal-private-property-in-object`，再重新打包后运行上传就行

# 2023-09-26 00:56:50

- 结合 vite 新增环境变量，dev 和 prod 使用不同 apiurl
- 打包和开发命令后加上

# 2023-09-27 09:57:02

- 如果加入了 uni-ui 新的组件。如 checkbox 或者 uni-file-picker 等，重新编译后要重新打开开发者工具

# 2023 年 10 月 14 日 14:48:41

- 加入微信小程序 ci 工具，特别要注意要开始 es7 转 es5 和 es6 转 es5 功能
- 全局安装 ci 工具`npm install miniprogram-ci -g`
  `miniprogram-ci upload --pp ./dist/build/mp-weixin --pkp ./sgly.key --appid wx9f97249d67fa5353  --uv "sx"  --enable-es6 --enable-es7 --enable-minify`
  miniprogram-ci upload --pp ./dist/build/mp-weixin --pkp ./sgly.key --appid wx9f97249d67fa5353 --uv "1.1.1" --ud "测试 1" --enable-es6 --enable-es7 --enable-minify
