---
title: Rust设置代理
date: 2019-01-12 23:39:14
tags: Rust
header_img: 
---

使用中科大的镜像，在环境变量中加入以下两个： 

> 变量名：RUSTUP_DIST_SERVER，变量值：https://mirrors.ustc.edu.cn/rust-static 

>变量名：RUSTUP_UPDATE_ROOT，变量值：https://mirrors.ustc.edu.cn/rust-static/rustup 

加好之后再运行rustup-init.exe即可
