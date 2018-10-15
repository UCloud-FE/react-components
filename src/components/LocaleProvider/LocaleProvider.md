### 说明

*   国际化语言组件，用于外围包裹来支持统一控制组件的语言
*   语言控制分为 3 层，开发者可控制的为 2 层，均为可选，优先级从低到高分别是: `组件默认语言（开发者不可控） -> LocaleProvider.locale -> Component.locale`

### 注意点

*   通过 Modal.method 生成的 Modal 组件的语言控制无法通过 context 简单的传输，所以使用了 runtimeLocale，如果一个页面用到了两个传入不同 locale 的 LocaleProvider，那么 runtimeLocale 可能会错乱，请务必注意
*   如用到 DatePicker、Calendar 等日期相关组件，LocaleProvider 由于生命周期顺序的问题无法实时变更语言，需要手动设置 moment 的语言。

### 演示

*   自定义语言

```js {"codepath": "localeprovider.jsx"}
```

*   组件语言

```js {"codepath": "componentlocale.jsx"}
```

*   引入语言文件

代码:

```js static
import locale from '@ucloud-fe/react-components/lib/components/LocaleProvider/locale/en_US';
// 使用到DatePicker等日期相关组件的情况下需要手动设置moment语言
moment.locale('en');
const Demo = () => (
    <div>
        <LocaleProvider locale={locale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
<Demo />;
```

效果:

```js noeditor
const Demo = require('./__demo__/localefile').default;

<Demo />;
```

*   全语言列表

```js noeditor
const Demo = require('./__demo__/list').default;

<Demo />;
```
