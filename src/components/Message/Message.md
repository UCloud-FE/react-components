### 说明

*   Message 用来弹出提示框。

*   有 message, warning, success, error 四种不同的方法。

### 演示

*   method - Message 类的方法

接收四个参数，

*   message：显示的消息内容
*   duration: 显示时长，undefined 为默认时长，null 为不自动关闭
*   callback: 关闭时的回调
*   option: 自定义 Message 组件的 props （className、style 等）

```js {"codepath": "method.jsx"}
```

*   Message - 或者当组件使用

```js {"codepath": "base.jsx"}
```

*   custom - 自定义弹出 message 内容

接收三个参数，

*   message：显示的消息内容
*   duration: 显示时长，undefined 为默认时长，null 为不自动关闭
*   callback: 关闭时的回调

```js {"codepath": "custom.jsx"}
```

*   config - 自定义 message 配置

可配置全局 message 的配置，会影响后续所有的 message。务必慎用

*   duration: 显示时长，null 为不自动关闭
*   top: Message 容器距离顶部的距离

```js {"codepath": "config.jsx"}
```
