### 说明

-   这是 Tree - 树组件
-   与程序树概念不同，按照目前的交互这里的树父节点、子节点有着本质的区别，选中只包括子节点，父节点只做展示，故数据结构中的称谓也有所差异

### 数据结构

#### Key

```ts {"static": true}
// 值需为 string
type Key = string;
```

#### LoadData

```ts {"static": true}
interface LoadData {
    (key: Key): Promise<void>;
}
```

#### TreeData

```ts {"static": true}
interface TreeData {
    // 唯一键，所有值的字符串不得重复，会用作 key 和选中判定，如果为其它值会转为 string 再应用
    key: Key;
    // 选项标题内容
    title: ReactNode;
    // 子数据，存在即为父节点，不存在即为叶子结点，与程序树有差异，原因详见说明
    children?: TreeData[];
    // 是否禁用，父节点禁用会禁用所有子孙节点
    disabled?: boolean;
    // 是否强制为父节点
    isParent?: boolean;
}
```

### 交互逻辑

1. 全选、反选、取消选择 等内置方法不会影响禁用项目的勾选状态。
2. 全选状态的展示与禁用项目无关
3. 存在禁用选中项时会展示部分选中

### 演示

#### 功能演示

```js {"codepath": "tree.jsx"}
```

#### method - 内置方法

注意全选和反选只有多选模式下生效

```js {"codepath": "method.jsx"}
```

#### controlled / uncontrolled - 受控 / 非受控

```js {"codepath": "controlled.jsx"}
```

#### loadData - 异步加载数据

1. 异步加载数据需要在待加载的父级数据中添加 isParent，来告知组件展示展开按钮，通过 loadData 来加载数据后需要更新 DataSource
2. 由于 Tree 为 Memo Component，更新时需要更新引用
3. 异步加载需注意无法使用多选场景，多选时数据未加载无法获取选中数据

```js {"codepath": "loadData.jsx"}
```

<!-- #### search - 搜索

```js {"codepath": "search.jsx"}
``` -->

#### 大数据性能测试

```js {"codepath": "bigData.jsx"}
```
