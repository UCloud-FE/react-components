### 说明

-   这是 Popover 组件，弹出层功能型组件
-   使用弹出层时需要注意弹出层的容器，如果弹出层的容器为 overflow 容器且具有定位属性或在其内部或嵌套等情况（以下简称 overflow 容器），弹出内容会自动计算定位避开滚动或隐藏，防止被遮挡，但是某些情况下会导致定位的偏移，所以需要保证容器能够完整的显示弹出层，或者将容器设置到 overflow 容器的外部。
-   Popover 默认的弹出层容器为 body，可使用 getPopupContainer 来自定弹层的容器，或者使用 forwardPopupContainer 自动避开本组件库内组件的 overflow 容器（如 Card，Table 等）。
-   Modal、Drawer 较为特殊，会中断 forwardPopupContainer，从而避免找到上层非同 dom 级的容器

### 演示

#### 普通使用

```js {"codepath": "base.jsx"}
```

#### animation - 动画

```js {"codepath": "animation.jsx"}
```

#### placement - 定位

```js {"codepath": "placement.jsx"}
```

#### stretch - 尺寸自适应

```js {"codepath": "stretch.jsx"}
```

#### alignPoint - 鼠标位置定位

```js {"codepath": "point.jsx"}
```

#### visible - 控制弹出层展示(受控)

```js {"codepath": "control.jsx"}
```

#### forwardPopupContainer - 自动定位弹出层容器

```js {"codepath": "forwardPopupContainer.jsx"}
```
