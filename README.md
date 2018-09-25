## React Components

[![npm version](https://badge.fury.io/js/%40ucloud-fe%2Freact-components.svg)](https://badge.fury.io/js/%40ucloud-fe%2Freact-components)
[![Build Status](https://travis-ci.org/UCloud-FE/react-components.svg?branch=master)](https://travis-ci.org/UCloud-FE/react-components)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

### 前排注意事项

*   一些没有写在文档中的 props 以及方法等强烈不建议使用，因为这类 API 可能会随时变动。版本更新后可能会发生不可预知的问题。

### 如何使用

*   从内部 npm 源直接安装

```bash
<!-- install use yarn -->
yarn add @ucloud-fe/react-components --registry=http://registry.npm.pre.ucloudadmin.com
<!-- install use npm -->
npm install @ucloud-fe/react-components --registry=http://registry.npm.pre.ucloudadmin.com
<!-- install with url -->
npm install http://registry.npm.pre.ucloudadmin.com/@ucloud-fe/react-components/download/@ucloud-fe/react-components-${version}
```

*   导入组件并按需导入字体样式并使用

```js static
import { Button } from '@ucloud-fe/react-components';
// 按需导入字体icon样式，可省略
import '@ucloud-fe/react-components/dist/icon.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Button>按钮</Button>
            </div>
        );
    }
}

export default App;
```

*   需要注意对应修改 webpack 的 loader 配置，根据项目具体配置

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

*   实现模块化加载

    *   通过`babel-plugin-import`实现模块化加载

    ```bash
    <!-- 添加import插件 -->
    npm install babel-plugin-import --dev
    ```

    ```json
    <!-- 在babel的plugins中添加配置 -->
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

    *   或者直接手动引用对应文件来实现模块化加载

    ```js static
    import Button from '@ucloud-fe/react-components/lib/components/Button';
    ```

### 如何在 Create-React-App 中使用

#### 添加到依赖

1.  通过 Create-React-App 创建好项目
2.  按照上述文档将 react-components 添加到依赖，然后按照需要去引用

#### 模块化支持

1.  修改项目的自定义配置，不支持的需要先执行`npm run eject`。
2.  按照上述文档在 babel 的 plugin 中添加配置

### zIndex 说明

*   Modal 默认的 zIndex 为 1010
*   Message 默认的 zIndex 为 1060
*   Popover 默认的 zIndex 为 100
*   Loading 默认的 zIndex 为 10
*   其余内部使用的 zIndex 为 10 以下
