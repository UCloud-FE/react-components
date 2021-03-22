### 说明

-   这是 Combine 组件，主要用于组合各种表单控件的布局
-   提供紧凑型布局和间隔型布局，并可方便控件间 props 共享
-   <del>_Combine 会在包裹的组件上添加 className，让组件 display 变为 inline-block，vertical-align 变为 middle，并在组件间添加间距。所以包裹的组件需要注意 className 的继承。_</del>
-   **由于类名继承某些情况下比较繁琐，如在外层包裹 Popover、Tooltip 或其他组件等情况下，故现修改为使用容器包裹的方式来进行排版，容器为 inline-block、vertical-align 为 middle。**
-   关于 sharedProps：**使用 sharedProps 除了影响 size 外还会在包裹的组件上添加 props，如果外层组件包裹了 Popover 等 sharedProps 会被 Popover 拿到，而导致内部拿不到，这种情况可以自己传递或直接把 sharedProps 放到包裹的组件中**
-   **child 为 null、undefined、false 时不做包裹，空字符串、0 不受影响**

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

#### null - 空值处理

```js {"codepath": "null.jsx"}
```

#### demo - 样例展示

```js {"codepath": "demo.jsx"}
```
