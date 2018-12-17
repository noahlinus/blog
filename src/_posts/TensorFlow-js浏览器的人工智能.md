---
title: TensorFlow.js浏览器的人工智能
catalog: true
header-img: /img/header_img/content-bg.jpg
date: 2018-08-18 20:55:43
subtitle:
tags: 人工智能
---

# 什么是TensorFlow

TensorFlow™ 是一个采用数据流图（data flow graphs），用于数值计算的开源软件库。节点（Nodes）在图中表示数学操作，图中的线（edges）则表示在节点间相互联系的多维数据数组，即张量（tensor）。它灵活的架构让你可以在多种平台上展开计算，例如台式计算机中的一个或多个CPU（或GPU），服务器，移动设备等等。TensorFlow 最初由Google大脑小组（隶属于Google机器智能研究机构）的研究员和工程师们开发出来，用于机器学习和深度神经网络方面的研究，但这个系统的通用性使其也可广泛用于其他计算领域。

# 什么是数据流图（Data Flow Graph）?

数据流图用“结点”（nodes）和“线”(edges)的有向图来描述数学计算。“节点” 一般用来表示施加的数学操作，但也可以表示数据输入（feed in）的起点/输出（push out）的终点，或者是读取/写入持久变量（persistent variable）的终点。“线”表示“节点”之间的输入/输出关系。这些数据“线”可以输运“size可动态调整”的多维数据数组，即“张量”（tensor）。张量从图中流过的直观图像是这个工具取名为“Tensorflow”的原因。一旦输入端的所有张量准备好，节点将被分配到各种计算设备完成异步并行地执行运算。

# TensorFlow.js核心概念

TensorFlow.js是一个用于机器智能的开源WebGL加速JavaScript库。它为您的指尖带来了高性能的机器学习构建块，允许您在浏览器中训练神经网络或在推理模式下运行预先训练的模型。有关安装/配置TensorFlow.js的指南，请参阅“ 入门”。

TensorFlow.js提供用于机器学习的低级构建块以及用于构建神经网络的高级Keras启发式API。我们来看看该库的一些核心组件。

张量
TensorFlow.js中的中心数据单位是张量：一组数值，形状为一个或多个维度的数组。甲Tensor实例有一个shape定义该阵列形状属性（即，有多少个值是在所述阵列的每一维）。

主要Tensor构造函数是tf.tensor函数：

```js
// 2x3 Tensor
const shape = [2, 3]; // 2 rows, 3 columns
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // print Tensor values
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// The shape can also be inferred:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]
```

然而，构建低秩张量，我们建议您使用以下功能来提高代码的可读性：`tf.scalar，tf.tensor1d，tf.tensor2d，tf.tensor3d`和`tf.tensor4d`。

以下示例使用以下内容创建与上面相同的张量`tf.tensor2d`：

```js
const c = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
c.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]
```

....后续更新
