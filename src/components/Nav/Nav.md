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

#### filterSmallType

折叠目录时，某项 SubMenuType 设置了 filterSmallType 为 true，会将其 children 代替其本身

```js {"codepath": "filter-small-type.jsx"}
```

#### ItemType

type ItemType = MenuItemType | SubMenuType

##### MenuItemType

| 参数      | 说明     | 类型                |
| --------- | -------- | ------------------- |
| icon      | 菜单图标 | React.ReactNode     |
| title     | 标题     | string              |
| labelType | 标题类型 | 'normal' ｜ 'small' |
| key       | 唯一标识 | string              |

##### SubMenuType

| 参数            | 说明                                                                                                                 | 类型                |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------- |
| icon            | 菜单图标                                                                                                             | React.ReactNode     |
| title           | 标题                                                                                                                 | string              |
| labelType       | 标题类型                                                                                                             | 'normal' ｜ 'small' |
| key             | 唯一标识                                                                                                             | string              |
| children        | 子菜单项                                                                                                             | ItemType[]          |
| filterSmallType | 折叠目录时，是否过滤 type 为 small 这一层级的标题，将其子级内容代替它本身，该属性只有 inlineCollapsed 为 true 时生效 | boolean             |
