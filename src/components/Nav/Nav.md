### 说明

这是 Nav 基础导航

### 演示

#### 只有一级目录

```js {"codepath": "one-level.jsx"}
```

#### 一/二级目录 + 切换应用 + 分类标题 + 路由跳转

```js {"codepath": "all-comp.jsx"}
```

#### 受控模式

```js {"codepath": "default-open-keys.jsx"}
```

#### 垂直展开 + 路由跳转

mode 为 vertical 的垂直展开模式，labelType 为 small 的小标题还是向下展开，其余正常大小的标题垂直展开

结合 react-router 使用时可以用 subMenuItemRender 和 menuItemRender 方法

```js {"codepath": "vertical.jsx"}
```

#### 折叠目录

折叠目录时，labelType 为 small 的小标题与正常标题显示相同，如果没有 Icon，会显示标题的第一个字

```js {"codepath": "collapsed.jsx"}
```

#### ItemType

type ItemType = MenuItemType | SubMenuType

##### MenuItemType

| 参数      | 说明     | 类型                | 默认值 |
| --------- | -------- | ------------------- | ------ |
| icon      | 菜单图标 | React.ReactNode     |        |
| title     | 标题     | string              |        |
| labelType | 标题类型 | 'normal' ｜ 'small' | normal |
| key       | 唯一标识 | string              |        |

##### SubMenuType

| 参数      | 说明     | 类型                | 默认值 |
| --------- | -------- | ------------------- | ------ |
| icon      | 菜单图标 | React.ReactNode     |        |
| title     | 标题     | string              |        |
| labelType | 标题类型 | 'normal' ｜ 'small' | normal |
| key       | 唯一标识 | string              |        |
| children  | 子菜单项 | ItemType[]          |        |
