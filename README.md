# 用React搭建的博客

## 前言

之前用hexo，突然冒出想用react搭建博客的想法来加强可定制型，才创建了这个项目，这个项目整体样式风格是模范HUX BLOG，我的博客地址：https://linyouyuan.github.io/。

## 使用框架

主要框架是`react`,`react-router`,`antd`,`sytle-component`，每篇文章都是通过`import()`异步加载的方式加载文章，不会导致首屏加载慢的问题。

## 使用

- npm start

启动dev-server调试

- npm run build

编译打包

- npm run new-post

创建文章

- npm run sync

打包发布文章，将要发布的git地址clone到build目录下，然后输入命令就可以打包发布。

## 未完成

1.cli工具

创建一个cli工具方便用户直接创建。目前临时方案是，用户可以直接clone我的代码，然后删除掉articles和build文件夹下的内容，然后将用户自己要打包发布的git地址clone到build文件夹下就好。

2.SEO问题

解决单页应用无法SEO的问题。

3.PWA应用

做成PWA应用。
