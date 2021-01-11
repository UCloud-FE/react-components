### 说明

-   传入其它原生的 props 会自动附加到最外层的 div 上，如 style、className 等
-   是否受控由一开始是否传入 fileList 决定，如果想要受控但是一开始未传入可能会导致逻辑性的错误。受控情况下需要自行处理所有数据。
-   选择文件的事件触发顺序为 打开文件选择框 - 选择文件 - 检查文件类型（有错误会中断，触发 onError） - 检查文件大小（有错误会中断，触发 onError） - 调用 onAdd（没有则跳过，返回 false 则中断） - 检查文件数量（有错误会中断，触发 onError） - 更新文件列表并触发 onChange - 有 handleUpload 时开始更新文件 status 为 uploading 并开始上传文件，触发 onChange - 文件上传进度更新时可调用 handleProcess，更新进度，更新后会触发 onChange - 文件上传成功或失败时更新文件 status 并触发 onChange
-   单选时选中文件将会直接将已有文件替换
-   单选时在调用 onAdd 之前如已存在选择文件将会先调用 onRemove 检查可否移除已有文件，只有两个都通过时才会触发 onChange
-   单选时不会触发文件数量错误，

#### fileList 中的文件格式

```js static
const fileShape = {
    // 文件名，用来展示名称
    name: PropTypes.string.isRequired,
    // 文件的 uid，唯一标示，用作性能优化和标志位
    uid: PropTypes.string.isRequired,
    // 文件的尺寸
    size: PropTypes.number,
    // 文件的类型
    type: PropTypes.string,
    // 文件的状态
    status: PropTypes.string,
    // 文件上传的进度
    progress: PropTypes.number,
    // 缩略图的地址
    thumbnailUrl: PropTypes.string
    // 文件的地址，默认用作点击新窗口打开
    url: PropTypes.string
}
```

### 演示

#### 演示

```js {"codepath": "upload.jsx"}
```

#### 简单使用

```js {"codepath": "base.jsx"}
```

#### multiple: true - 支持多选

```js {"codepath": "multiple.jsx"}
```

#### multiple: false - 支持单选

```js {"codepath": "single.jsx"}
```

#### maxCount - 限制文件数量

```js {"codepath": "maxCount.jsx"}
```

#### maxSize - 限制文件大小

```js {"codepath": "maxSize.jsx"}
```

#### accept - 限制文件类型

```js {"codepath": "accept.jsx"}
```

#### disabled - 禁用

```js {"codepath": "disabled.jsx"}
```

#### onAdd - 控制文件添加

```js {"codepath": "onAdd.jsx"}
```

#### onRemove - 控制文件删除

```js {"codepath": "onRemove.jsx"}
```

#### onPreview - 自定义文件预览

```js {"codepath": "onPreview.jsx"}
```

#### selector - 自定义选择控件

```js {"codepath": "selector.jsx"}
```

#### listType - 隐藏文件列表

```js {"codepath": "listType.jsx"}
```

#### defaultFileList - 默认文件列表

```js {"codepath": "uncontrolled.jsx"}
```

#### handleUpload - 上传

```js {"codepath": "handleUpload.jsx"}
```

#### fileList - 受控组件

```js {"codepath": "controlled.jsx"}
```

#### 案例展示

```js {"codepath": "demo.jsx"}
```

#### ui - UI 展示列表

```js {"codepath": "ui.jsx"}
```

### 其它

#### 提供读取文件 dataUrl 的工具函数

```js {"codepath": "readFile.jsx"}
```
