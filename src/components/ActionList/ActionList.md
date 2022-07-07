### 说明

-   这是 ActionList 操作列表组件
-   外部的操作继承按钮的属性，支持配置按钮的 props，如 disabled、styleType 等，额外增加 tooltip 支持（使用时会默认开启按钮的 fakeDisabled），展开的操作支持 Menu.Item 的 props，disabled、tooltip 等
-   默认的弹出层容器为 forwardPopupContainer={triggerNode => triggerNode.parentNode}，默认会查找上层的建议容器

### 接口

```ts {"static": true}
interface ActionInfo {
    /** 展示 */
    label?: ReactNode;
    /** 点击回调 */
    onClick?: (e: MouseEvent) => void;
    /** 子菜单，仅 menu 项有效 */
    children?: ActionInfo[];
    /** 提示 */
    tooltip?: ReactNode;
    /** 禁用 */
    disabled?: boolean;
}
```

### 演示

#### 演示

```js {"codepath": "actionList.jsx"}
```

#### size - 尺寸

```js {"codepath": "size.jsx"}
```

#### exposeCount - 展示数量

```js {"codepath": "exposeCount.jsx"}
```

#### smart - 菜单中只剩下一个操作时自动显示

```js {"codepath": "smart.jsx"}
```

#### actionChildren - 子菜单

```js {"codepath": "actionChildren.jsx"}
```

#### popoverProps - 弹出层 props

```js {"codepath": "popoverProps.jsx"}
```

#### dropdownButton - 自定义展开按钮

```js {"codepath": "dropdownButton.jsx"}
```

#### item.tooltip - 内容提示

```js {"codepath": "tooltip.jsx"}
```

#### autoAdjustment

```js {"codepath": "resizable.jsx"}
```
