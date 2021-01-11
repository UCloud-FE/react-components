### 说明

-   Message 用来弹出提示框。
-   普遍会使用 method 调用的方式
-   有 message, success, warning, error, loading 几种不同的方法。

### 演示

#### method - Message 类的方法

接收四个参数，

-   message：显示的消息内容 ｜ 传入 message 的 props
-   duration: 显示时长，undefined 为默认时长，null 为不自动关闭
-   callback: 关闭时的回调
-   option: 自定义属性，目前仅支持 zIndex

```js {"codepath": "method.jsx"}
```

#### Message - 或者当组件使用

```js {"codepath": "message.jsx"}
```

#### title - 标题

```js {"codepath": "title.jsx"}
```

#### footer - 底栏

```js {"codepath": "footer.jsx"}
```

#### custom - 自定义弹出 message 内容

想弹出自定义的 Message 展示框时可使用，接收三个参数，

-   message：显示的消息内容
-   duration: 显示时长，undefined 为默认时长，null 为不自动关闭，同上
-   callback: 关闭时的回调

```js {"codepath": "custom.jsx"}
```

#### config - 自定义 message 配置

可配置全局 message 的配置，会影响后续所有的 message。务必慎用

-   duration: 显示时长，null 为不自动关闭
-   top: Message 容器距离顶部的距离

```js {"codepath": "config.jsx"}
```

#### demo - 样例展示

```js {"codepath": "demo.jsx"}
```
