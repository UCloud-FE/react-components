### 说明

-   Table 表格组件，通过传入 column 和 dataSource 来快速生成表格，内置搜索、滚动、表格列固定等功能。
-   为了确保数据的准确性请务必保证每条数据存在有效不重复的 key 或者使用 rowKey 来指定 key 的获取方式，表格中将会依照 key 来进行选择等操作。不传入将会使用数据在每一页中的 index 来作为 key，可能会造成 key 重复而导致错误，甚至造成各种奇怪的错误现象。
-   rowKey 支持函数，第二个参数为 record 在当前页面的 index，强烈不推荐使用！！！请务必注意。

### 演示

#### 属性调试

```js {"codepath": "table.jsx"}
```

#### 基本使用

```js {"codepath": "base.jsx"}
```

#### columns - 表格列属性定义

```js {"codepath": "columns.jsx"}
```

#### emptyContent - 自定义空表格提示

```js {"codepath": "emptyContent.jsx"}
```

#### errorContent - 报错提示内容

```js {"codepath": "errorContent.jsx"}
```

#### scroll - 滚动定义

```js {"codepath": "scroll.jsx"}
```

#### title - 自定义表格顶部内容

```js {"codepath": "title.jsx"}
```

#### footer - 自定义表格底部内容

```js {"codepath": "footer.jsx"}
```

#### pagination - 自定义分页设置

```js {"codepath": "pagination.jsx"}
```

#### rowKey - 定义 key 的获取

```js {"codepath": "rowKey.jsx"}
```

#### contextMenu - 右键菜单

```js {"codepath": "contextMenu.jsx"}
```

#### filter - 筛选

```js {"codepath": "filter.jsx"}
```

#### order - 排序

```js {"codepath": "order.jsx"}
```

#### expandedRowRender - 扩展内容渲染

```js {"codepath": "expandedRowRender.jsx"}
```

#### hideExpandIcon - 隐藏扩展列展开按钮

```js {"codepath": "hideExpandIcon.jsx"}
```

#### expandedRowKeys - 展开列

```js {"codepath": "expandedRowKeys.jsx"}
```

#### defaultExpandAllRows - 默认展开扩展列

`使用时务必注意 rowKey 的使用，使用此属性可能会影响到表格的性能`

```js {"codepath": "defaultExpandAllRows.jsx"}
```

#### onRow - 设置行 props

```js {"codepath": "onRow.jsx"}
```

#### onHeaderRow - 设置表头 props

```js {"codepath": "onHeaderRow.jsx"}
```

#### rowSelection - 列选择配置

```js {"codepath": "rowSelection.jsx"}
```

#### dragSorting - 列选择配置

```js {"codepath": "dragSorting.jsx"}
```

#### fixed - 固定表头、列

```js {"codepath": "fixed.jsx"}
```

#### columnResizable - 可调表头大小

需要在回调中自行控制 column width

```js {"codepath": "resizable.jsx"}
```

#### 列分组

```js {"codepath": "groupColumns.jsx"}
```

#### 子表格

```js {"codepath": "subTable.jsx"}
```

#### 子表格-复选框 父子联动

```js {"codepath": "subTableForCheckBox.jsx"}
```

#### onConditionChange - 由于 pagination 的某些设计，onConditionChange 返回值中不包含 pagination 变化，要监听 pagination 请使用 pagination 参数

```js {"codepath": "onConditionChange.jsx"}
```

#### doNotHandleCondition - 自行处理筛选等逻辑

```js {"codepath": "doNotHandleCondition.jsx"}
```

#### 远程加载数据

```js {"codepath": "loadingDataFromRemote.jsx"}
```

#### 后端分页、搜索、筛选、排序

```js {"codepath": "fullRemoteTable.jsx"}
```

#### popupContainer - 弹出层容器

```js {"codepath": "popupContainer.jsx"}
```

#### 单元格合并

```js {"codepath": "cellMerge.jsx"}
```

#### demo - 样例演示

```js {"codepath": "demo.jsx"}
```
