### 说明

-   AutoComplete 能够尝试猜测⽤户输⼊的⽂字，并且动态的搜索出适配的结果并推荐给⽤户，辅助完成输⼊。⽬的是避免⽤户出错，起到提示作⽤，智能预测⽤户⼼理期望，从⽽确保他们的输⼊更有效率。
-   默认的弹出层容器为 forwardPopupContainer={triggerNode => triggerNode.parentNode}，默认会查找上层的建议容器

### 数据结构

#### Key

```ts {"static": true}
interface Item {
    // 项的值
    value: string;
    // 项的展示，为空时展示 value
    label?: ReactNode;
}
```

### 演示

-   普通使用

```js {"codepath": "autoComplete.jsx"}
```

-   disabled - 禁用

```js {"codepath": "disabled.jsx"}
```

-   options - 选项展示

```js {"codepath": "options.jsx"}
```

-   handleSearch - 自定义搜索

```js {"codepath": "handleSearch.jsx"}
```

-   controlled - 受控

```js {"codepath": "controlled.jsx"}
```

-   动态加载数据

```js {"codepath": "loading.jsx"}
```

-   输入建议

```js {"codepath": "suggest.jsx"}
```

-   popupContainer - 容器测试

```js {"codepath": "popupContainer.jsx"}
```
