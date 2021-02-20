### 说明

-   这是 Tree - 树组件

### 数据结构

#### Value

```ts {"static": true}
// 值需为 string
type Value = string;
```

#### TreeData

```ts {"static": true}
interface TreeData {
    // 值，所有值的字符串不得重复，会用作 key 和选中判定，如果为其它值会转为 string 再应用
    value: Value;
    // 选项标题内容
    title: ReactNode;
    // 子数据
    children?: TreeData[];
    // 是否禁用
    disabled?: boolean;
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

#### 大数据性能测试

```js {"codepath": "bigData.jsx"}
```
