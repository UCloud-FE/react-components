### 说明

-   该组件主要用于卡片式布局，包含 Header、Action、Footer、Content 四个子组件。
-   由于 Card 外层具有 overflow，内部的弹层会被遮挡错位，现通过 Context 来解决，在 Card 内部的弹层将会自动使用 Card 的 parentNode 作为容器，可参考下方容器测试 demo

### 演示

#### 普通使用

```js {"codepath": "card.jsx"}
```

#### 列表展示

```js {"codepath": "list.jsx"}
```

#### 自定义顺序等

```js {"codepath": "custom.jsx"}
```

#### 拆分展示

```js {"codepath": "single.jsx"}
```

#### popupContainer - 容器测试

```js {"codepath": "popupContainer.jsx"}
```
