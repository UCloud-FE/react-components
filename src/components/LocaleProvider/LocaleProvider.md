### 说明

*   国际化语言组件，用于外围包裹来支持统一控制组件的语言
*   语言控制分为 3 层，开发者可控制的为 2 层，均为可选，优先级从低到高分别是: `组件默认语言（开发者不可控） -> LocaleProvider.locale -> Component.locale`

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
const locale = require('src/components/LocaleProvider/locale/en_US').default;
const Demo = () => (
    <div>
        <LocaleProvider locale={locale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
<Demo />;
```
