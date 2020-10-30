### 说明

-   这是 Table 组件

### 提示

-   为了确保数据的准确性请务必保证每条数据存在有效不重复的 key 或者使用 rowKey 来指定 key 的获取方式，表格中将会依照 key 来进行选择等操作。不传入将会使用数据在每一页中的 index 来作为 key，可能会造成 key 重复而导致错误，甚至造成各种奇怪的错误现象。
-   rowKey 支持函数，第二个参数为 record 在当前页面的 index，强烈不推荐使用！！！请务必注意。

### 演示

-   演示

```js {"codepath": "table.jsx"}
```

-   columns

```js {"codepath": "columns.jsx"}
```

-   普通使用

```js {"codepath": "base.jsx"}
```

-   emptyContent

```js {"codepath": "emptyContent.jsx"}
```

-   errorContent

```js {"codepath": "errorContent.jsx"}
```

-   scroll

```js {"codepath": "scroll.jsx"}
```

-   title

```js {"codepath": "title.jsx"}
```

-   footer

```js {"codepath": "footer.jsx"}
```

-   pagination

```js {"codepath": "pagination.jsx"}
```

-   rowKey

```js {"codepath": "rowKey.jsx"}
```

-   contextMenu

```js {"codepath": "contextMenu.jsx"}
```

-   filter

```js {"codepath": "filter.jsx"}
```

-   order

```js {"codepath": "order.jsx"}
```

-   expandedRowRender

```js {"codepath": "expandedRowRender.jsx"}
```

-   hideExpandIcon - 隐藏扩展列展开按钮

```js {"codepath": "hideExpandIcon.jsx"}
```

-   expandedRowKeys - 展开列

```js {"codepath": "expandedRowKeys.jsx"}
```

-   defaultExpandAllRows - 默认展开扩展列

    `使用时务必注意 rowKey 的使用，使用此属性可能会影响到表格的性能`

```js {"codepath": "defaultExpandAllRows.jsx"}
```

-   onRow - 设置行 props

```js {"codepath": "onRow.jsx"}
```

-   onHeaderRow - 设置表头 props

```js {"codepath": "onHeaderRow.jsx"}
```

-   rowSelection - 列选择配置

```js {"codepath": "rowSelection.jsx"}
```

-   fixed - 固定表头、列

```js {"codepath": "fixed.jsx"}
```

-   列分组

```js {"codepath": "groupColumns.jsx"}
```

-   子表格

```js {"codepath": "subTable.jsx"}
```

-   onConditionChange - 由于 pagination 的某些设计，onConditionChange 返回值中不包含 pagination 变化，要监听 pagination 请使用 pagination 参数

```js {"codepath": "onConditionChange.jsx"}
```

-   doNotHandleCondition - 自行处理筛选等逻辑

```js {"codepath": "doNotHandleCondition.jsx"}
```

-   远程加载数据

```js {"codepath": "loadingDataFromRemote.jsx"}
```

-   后端分页、搜索、筛选、排序

```js {"codepath": "fullRemoteTable.jsx"}
```

-   popupContainer - 弹出层容器

```js {"codepath": "popupContainer.jsx"}
```

-   demo - 样例演示

```js {"codepath": "demo.jsx"}
```

-   单元格合并

```js {"codepath": "cellMerge.jsx"}
```
