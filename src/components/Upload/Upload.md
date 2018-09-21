### 说明

*   传入其它原生的 props 会自动附加到最外层的 div 上，如 style、className 等
*   是否受控由一开始是否传入 fileList 决定，如果想要受控但是一开始未传入可能会导致逻辑性的错误。受控情况下需要自行处理所有数据。
*   选择文件的事件触发顺序为 打开文件选择框 - 选择文件 - 检查文件类型（有错误会中断，触发 onError） - 检查文件大小（有错误会中断，触发 onError） - 调用 onAdd（没有则跳过，返回 false 则中断） - 检查文件数量（有错误会中断，触发 onError） - 更新文件列表并触发 onChange - 有 handleUpload 时开始更新文件 status 为 uploading 并开始上传文件，触发 onChange - 文件上传成功或失败时更新文件 status 并触发 onChange

### 演示

*   演示

```js {"codepath": "upload.jsx"}
```

*   简单使用

```js {"codepath": "base.jsx"}
```

*   支持多选

```js {"codepath": "multiple.jsx"}
```

*   限制文件数量

```js {"codepath": "maxCount.jsx"}
```

*   限制文件大小

```js {"codepath": "maxSize.jsx"}
```

*   限制文件类型

```js {"codepath": "accept.jsx"}
```

*   禁用

```js {"codepath": "disabled.jsx"}
```

*   控制文件添加

```js {"codepath": "onAdd.jsx"}
```

*   控制文件删除

```js {"codepath": "onRemove.jsx"}
```

*   文件预览

```js {"codepath": "onPreview.jsx"}
```

*   自定义选择控件

```js {"codepath": "selector.jsx"}
```

*   隐藏文件列表

```js {"codepath": "listType.jsx"}
```

*   默认文件列表

```js {"codepath": "uncontrolled.jsx"}
```

*   上传

```js {"codepath": "handleUpload.jsx"}
```

*   受控组件

```js {"codepath": "controlled.jsx"}
```

### 其它

*   提供读取文件 dataUrl 的工具函数

```js {"codepath": "readFile.jsx"}
```
