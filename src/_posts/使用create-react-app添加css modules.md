---
title: 使用create-react-app添加css modules
tags: React
date: 2018-07-30 15:30:59
header-img: "/img/header_img/content-bg.jpg"
catalog: true
---

# 前言

`create-react-app`是facebook的官方脚手架，对于个人开发者和中小型公司快速创建项目非常推荐。react的CSS解决方案有很多，这里我技术选型时用`css modules`和`sass`，然后配合antd使用通用组件库。但是create-react-app原生并不支持`css modules`和`sass`，所以需要额外配置。

# 配置

## 增加css modules和sass

### 使用eject暴露配置

`create-react-app`默认是没有暴露`webpack`配置的，所以需要eject一下。注意如果项目在git仓库环境下，先提交代码到git仓库，否则会报错

```js
npm run eject
```

### npm添加css modules和sass

```js
npm install react-css-modules 
npm install sass-loader node-sass
```

这里安装sass可能会遇到墙的问题报错，所以要么使用cnpm或者使用本地代理设置，因为我有ss所以使用本地代理

```js
// 开启代理
npm config set proxy http://127.0.0.1:1080
// 安装完sass后关闭代理
npm config delete proxy
```

### webpack配置

重点来了，我们需要给`webpack`配置上`css-modules`和`sass-loader`。但是使用`css-modules`会使`node_modules`库里的css样式找不到，比如后面要使用到的antd，这个时候我们需要inclube来排除影响`node_modules`，使得`css-modules`不会影响到`node_modules`

修改项目中`config`目录下的`webpack.config.dev.js`和`webpack.config.prod.js`，说明下这两个文件，前一个是开发环境`npm start`使用，后一个是`npm run build`打包后使用

- 修改`webpack.config.dev.js`:

大约在160行左右，找到`test: /\.css$/`，中文注释的地方就是修改和增加的地方

```js
          {
            test: [/\.css$/, /\.scss$/],// 这里增加SCSS的支持
            exclude: [/node_modules/],// 这里去排除node_modules，防止css modules影响到node_modules
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true, // 这里增加对css modules的支持
                  localIdentName: '[name]__[local]__[hash:base64:5]' //这里增加对css modules的支持
                },
              },
              {
                loader: require.resolve('sass-loader'), // 这里增加sass的支持
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          // 因为上面排除了css_modules所以这里一定要再添加个排除src来识别css_modules
          // 其实就是复制之前没修改前的所有，再增加一个exclude: [/src/]
          {
            test: /\.css$/, 
            exclude: [/src/], // 这里添加排除src，
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          }
```

- 修改`webpack.config.prod.js`:

和上面修改`webpack.config.dev.js`类似

```js
        {
            test: [/\.css$/, /\.scss$/], // 这里增加SCSS的支持
            exclude: [/node_modules/], // 这里去排除node_modules
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true,
                        modules: true, // 这里添加css modules支持
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                    {
                      loader: require.resolve('sass-loader'), // 这里添加sass支持
                    }
                  ],
                },

                extractTextPluginOptions
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          {
            test: /\.css$/,
            exclude: [/src/], // 排除src
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    }
                  ],
                },

                extractTextPluginOptions
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          }
```

### 安装antd和配置

主要是安装配置`antd`和`babel-plugin-import`，这样可以使得`antd`按需加载样式

#### npm添加antd和babel-plugin-import

```js
npm install antd
npm install babel-plugin-import
```

#### 配置babel

在项目根目录下增加`.babelrc`文件，然后配置如下

```js
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    "transform-runtime",
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ]
  ]
}
```

大功告成
