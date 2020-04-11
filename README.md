# 项目简介

阿里百秀，内容管理系统，分为内容管理和内容展示两大核心功能。

## 1. 功能模块

#### 1.1 内容管理

| 模块   | 功能                |
| ---- | ----------------- |
| 用户   | 登录、退出、用户增删改查      |
| 文章   | 文章管理              |
| 分类   | 分类管理              |
| 评论   | 评论管理              |
| 网站设置 | 关键字、描述、网站logo、轮播图 |

#### 1.2 内容展示

| 模块   | 功能              |
| ---- | --------------- |
| 首页   | 导航、文章数据展示       |
| 列表页  | 根据分类显示文章列表      |
| 详情页  | 文章详情数据展示、实现评论功能 |

## 2. 开发模式

采用前后端分离开发模式


## 3. 项目架构

| 系统分层 | 使用技术                                   |
| ---- | -------------------------------------- |
| 数据层  | mongoDB                                |
| 服务层  | node.js (express)                      |
| 客户端  | art-template、jQuery、font-awesome、swipe |

## 4. 项目运行环境搭建

1. 安装node.js软件并测试其是否安装成功
   1. win + R 开启windows系统中的运行程序，在运行程序中输入powershell回车，打开命令行程序
   2. 输入`node -v`命令查看node.js的版本，在命令行程序中输出了版本号没有报错即说明安装成功
2. 安装mongodb、mongodb-compass软件
3. 将阿里百秀项目文件夹复制到硬盘中（服务器端程序）
4. 在命令行工具中进入到项目根目录中
   1. 按住shift键，点击鼠标右键，选择在此处打开powershell窗口
5. 使用`npm install`命令安装项目所需依赖文件
6. 将阿里百秀静态页面复制到public文件夹中
7. 在命令行工具中输入node app.js开启项目
