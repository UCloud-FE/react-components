### 说明

-   这是 Cascader 集联选择器组件
-   一般用于选择一些层级关联的数据，如选择地区等

### 数据结构

#### Key

```ts {"static": true}
// 值需为 string
type Key = string;
```

#### LoadData

```ts {"static": true}
interface LoadData {
    (expandedKeys: Key[]): Promise<void>;
}
```

#### CascadeData

```ts {"static": true}
interface CascadeData {
    // 唯一键，所有值的字符串不得重复，会用作 key 和选中判定，如果为其它值会转为 string 再应用
    key: Key;
    // 选项标题内容
    title: ReactNode;
    // 子数据，存在即为父节点，不存在即为叶子结点，与程序树有差异，原因详见说明
    children?: CascadeData[];
    // 是否禁用，父节点禁用会禁用所有子孙节点
    disabled?: boolean;
    // 是否强制为父节点
    isParent?: boolean;
}
```

### 演示

#### 功能演示

```js {"codepath": "cascader.jsx"}
```

#### 尺寸 - size

```js {"codepath": "size.jsx"}
```

#### 禁用 - disabled

```js {"codepath": "disabled.jsx"}
```

#### 是否可清空 - clearable

```js {"codepath": "clearable.jsx"}
```

#### 搜索 - search

```js {"codepath": "search.jsx"}
```

#### 异步加载 - loadData

```js {"codepath": "loadData.jsx"}
```

#### 级联顶部插槽 - topExtraRender

```js {"codepath": "topExtraRender.jsx"}
```

#### 性能测试

```js {"codepath": "performance.jsx"}
```

#### 边界测试

```js {"codepath": "boundary.jsx"}
```
