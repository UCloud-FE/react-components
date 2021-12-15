## React Components

<div class="badge" style="white-space: normal; margin-bottom: 10px;">

[![npm version](https://badge.fury.io/js/%40ucloud-fe%2Freact-components.svg)](https://badge.fury.io/js/%40ucloud-fe%2Freact-components)
[![TravisCI](https://travis-ci.org/UCloud-FE/react-components.svg?branch=master)](https://travis-ci.org/UCloud-FE/react-components)
[![CircleCI](https://circleci.com/gh/UCloud-FE/react-components.svg?style=svg)](https://circleci.com/gh/UCloud-FE/react-components)
[![codecov](https://codecov.io/gh/UCloud-FE/react-components/branch/master/graph/badge.svg)](https://codecov.io/gh/UCloud-FE/react-components)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

</div>

### 前排注意事项

-   一些没有写在文档中的 props 以及方法等强烈不建议使用，因为这类 API 可能会随时变动。版本更新后可能会发生不可预知的问题。

### 浏览器兼容

<div class='browser-list'>

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge 18                                                                                                                                                                                                   | 29                                                                                                                                                                                                                | 30                                                                                                                                                                                                            | 7                                                                                                                                                                                                             |

</div>

### 如何使用

-   组件依赖于 react（^16）、react-dom（^16），请注意引入对应依赖，从 0.7.0 开始，不再兼容 react 15。

-   使用 npm 或 yarn 进行安装

```bash
<!-- install use yarn -->
yarn add @ucloud-fe/react-components
<!-- install use npm -->
npm install @ucloud-fe/react-components
<!-- install with a fixed version -->
yarn add @ucloud-fe/react-components@0.3.1
```

-   需要注意对应修改 webpack 的 loader 配置，根据项目具体配置

```js static
{
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /.(svg|eot|ttf|woff)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }
                }
            ]
        }
    ];
}
```

-   实现模块化加载

    -   通过`babel-plugin-import`实现模块化加载

    添加 import 插件

    ```bash
    npm install babel-plugin-import --dev
    ```

    在 babel 的 plugins 中添加配置

    ```json
    {
        "plugins": [
            [
                "import",
                {
                    "libraryName": "@ucloud-fe/react-components",
                    "camel2DashComponentName": false,
                    "libraryDirectory": "lib/components"
                }
            ]
        ]
    }
    ```

    -   或者直接手动引用对应文件来实现模块化加载

    ```js static
    import Button from '@ucloud-fe/react-components/lib/components/Button';
    ```

### 如何在 Create-React-App 中使用

#### 添加到依赖

1.  通过 Create-React-App 创建好项目
2.  按照上述文档将 react-components 添加到依赖，然后按照需要去引用

#### 模块化支持

1.  修改项目的自定义配置，不支持的需要先执行 `npm run eject`。
2.  按照上述文档在 babel 的 plugin 中添加配置

### zIndex 说明

-   Modal、Drawer 默认的 zIndex 为 1010
-   Popover 默认的 zIndex 为 1030
-   Tooltip、Select、DatePicker、TimePicker、ActionList、PopConfirm 等 zIndex 同为 1030，弹出层容器、层级、滚动定位可通过 ConfigProvider 统一配置
-   Message 默认的 zIndex 为 1060
-   Loading 默认的 zIndex 为 10
-   其余内部使用的 zIndex 为 10 以下
