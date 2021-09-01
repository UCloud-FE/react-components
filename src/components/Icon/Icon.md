### 说明

-   传入其它原生的 props 会自动附加到最外层上，如 style、className 等
-   配合 prefix，可使用其它字体图标库
-   需要修改默认 prefix 的可使用 ConfigProvider
-   组件库中存在一份字体，需要使用可自行导入字体样式并使用
-   所有支持图标地址点这里[UCloud Icon Font](https://console-font.pre.ucloudadmin.com/)

```js static
// 按需导入字体icon样式
import '@ucloud-fe/react-components/dist/icon.min.css';
```

### 演示

#### 演示

```js {"codepath": "icon.jsx", "props": {"className": "editor_transparent"}}
```

#### type - icon 类型

```js {"codepath": "type.jsx"}
```

#### spin - 是否旋转

```js {"codepath": "spin.jsx"}
```

#### customStyle - 自定义样式

```js {"codepath": "customStyle.jsx"}
```
