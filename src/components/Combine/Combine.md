### 说明

-   这是 Combine 组件，主要用于组合各种表单控件的布局
-   提供紧凑型布局和间隔型布局，并可方便控件间 props 共享
-   Combine 会在包裹的组件上添加 className，让组件 display 变为 inline-block，vertical-align 变为 middle，并在组件间添加间距。所以包裹的组件需要注意 className 的继承。

### 演示

#### 演示

```js {"codepath": "combine.jsx"}
```

#### sharedProps - props 共享

```js {"codepath": "sharedProps.jsx"}
```

#### spacing - 间距

```js {"codepath": "spacing.jsx"}
```

#### separator - 分隔符

```js {"codepath": "separator.jsx"}
```

#### demo - 样例展示

```js {"codepath": "demo.jsx"}
```
