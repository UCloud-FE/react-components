### 说明

-   这是 日期选择 组件
-   需要自行导入 moment 语言包、设置时区

### 数据结构

#### TDate

```ts {"static": true}
type TDate = number | Date | Moment | Dayjs;
```

#### TShortcut

```ts {"static": true}
interface TShortcut {
    handle: () => TDate;
    label: ReactNode;
}
```

### 演示

#### 演示

```js {"codepath": "datepicker.jsx"}
```

#### size - 尺寸

```js {"codepath": "datepicker-size.jsx"}
```

#### rules - 自定义规则

```js {"codepath": "datepicker-rules.jsx"}
```

#### nullable - 是否可为空/输入

```js {"codepath": "datepicker-nullable.jsx"}
```

#### display - 自定义展示形式

```js {"codepath": "datepicker-display.jsx"}
```

#### format - 自定义格式化/输入

```js {"codepath": "datepicker-format.jsx"}
```

#### status - 状态

```js {"codepath": "datepicker-status.jsx"}
```

#### disabled - 禁用

```js {"codepath": "datepicker-disabled.jsx"}
```

#### uncontrolled

```js {"codepath": "datepicker-uncontrolled.jsx"}
```

#### popoverProps - 弹出容器定义

```js {"codepath": "datepicker-popoverProps.jsx"}
```

#### 月份演示

```js {"codepath": "month.jsx"}
```

#### size - 月份尺寸

```js {"codepath": "month-size.jsx"}
```

#### rules - 月份自定义规则

```js {"codepath": "month-rules.jsx"}
```

#### nullable - 月份是否可为空/输入

```js {"codepath": "month-nullable.jsx"}
```

#### display - 月份自定义展示形式

```js {"codepath": "month-display.jsx"}
```

#### format - 月份自定义格式化/输入

```js {"codepath": "month-format.jsx"}
```

#### status - 月份状态

```js {"codepath": "month-status.jsx"}
```

#### disabled - 月份禁用

```js {"codepath": "month-disabled.jsx"}
```

#### uncontrolled - 月份非受控

```js {"codepath": "month-uncontrolled.jsx"}
```

#### popoverProps - 月份弹出层容器

```js {"codepath": "month-popoverProps.jsx"}
```
