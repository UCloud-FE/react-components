### 说明

*   ZForm 组件 为 rc-form 与 Form 组件的简单封装，包含 ZForm 组件、formDecorator、controllerDecorator 和 formShape

    *   ZForm 接收 rc-form 的 form 然后转换为 context 传到下面的 controller 中，减少重复的代码编写
    *   formDecorator 等同 rc-form 的 createForm，用于创建表单包裹
    *   controllerDecorator 约等于 rc-form 的 getFieldDecorator 的简写

*   ZForm 需要传入 rc-form 的 form 实例，ZForm 的包裹组件必须使用 formDecorator 来包裹，如下

    ```js static
    class DemoForm extends React.Component {
        render() {
            const { form } = this.props;

            return <ZForm form={form} />;
        }
    }
    DemoForm.propTypes = {
        form: formShape
    };
    const Demo = formDecorator()(DemoForm);
    ```

*   formDecorator 支持传入 option

    *   `onFieldsChange(props, changed, all): void` field 变化时触发
    *   `onValuesChange(props, changed, all): void` value 变化时触发

*   controllerDecorator 用于包裹表单组件来让 form 可以收集到组件中的数据，然后将封装后的组件放置到 ZForm 中，如下

    ```js static
    class Input extends React.Component {
        render() {
            return <input {...this.props} />;
        }
    }
    const ZInput = controllerDecorator({
        initialValue: ''
    })(Input);

    <ZForm form={form}>
        <Item>
            <ZInput zName="input" />
        </Item>
    </ZForm>;
    ```

*   controllerDecorator 包裹的控件为 controlled 状态，value 和 onChange 被 form 托管，组件内定义的默认值将无法生效，如一些控件依赖默认值（如 Slider、Input）必须要注意默认值的传入

    ```js static
    class Input extends React.Component {
        render() {
            return <input {...this.props} />;
        }
    }
    const ZInput = controllerDecorator({
        // 不传会导致uncontrolled变换为controlled告警
        initialValue: ''
    })(Input);

    <ZForm form={form}>
        <Item>
            <ZInput zName="input" />
        </Item>
    </ZForm>;
    ```

*   controllerDecorator 支持传入 option

    *   valuePropName - 组件的值的 prop 名称
    *   getValueProps - 根据组件的值获取 props
    *   getValueFromEvent - 如何从 event 中获取值
    *   initialValue - 初始值
    *   normalize(value, prev, all): Object - 格式化值
    *   trigger - 如何获取组件的数据
    *   validateTrigger - 何时触发校验
    *   rules - 组件的验证规则
    *   validateFirst - 校验是否发生错误及停止
    *   validate - 自定义校验
    *   validate[n].trigger - 校验何时触发
    *   validate[n].rules - 校验规则
    *   hidden - 是否在表单中忽略该组件，不做校验和数据手机

*   validate

    ```js static
    {
        validateTrigger: 'onBlur',
        rules: [{required: true}],
    }
    /* 等效于 */
    {
        validate: [{
            trigger: 'onBlur',
            rules: [{required: true}],
        }]
    }
    ```

*   默认的 getValueFromEvent

    ```js static
    function defaultGetValueFromEvent(e) {
        if (!e || !e.target) {
            return e;
        }
        const { target } = e;
        return target.type === 'checkbox' ? target.checked : target.value;
    }
    ```

*   form 实例下有一系列方法来获取、设置、校验值等

    *   getFieldsValue([fieldNames: String[]])
        获取对应 field 的值，不传为所有
    *   getFieldValue(fieldName: String)
        获取单个 field 的值
    *   getFieldInstance(fieldName: String)
        获取对应 field 的实例
    *   setFieldsValue(obj: Object)
        通过 key-value 对象设置 field 的值
    *   setFieldsInitialValue(obj: Object)
        通过 key-value 对象设置 field 的初始值
    *   setFields(obj: Object)
        通过 key-value 对象设置 field 的值和 errors
    *   validateFields([fieldNames: String[]], [options: Object], callback: (errors, values) => void)
        校验表单
    *   getFieldsError(names): Object{ [name]: String[] }
        获取对应 field 的错误信息
    *   getFieldError(name): String[]
        获取 field 的错误
    *   isFieldValidating(name: String): Bool
        获取 field 是否正在校验
    *   isFieldsValidating(names: String[]): Bool
        是否其中存在 field 正在校验
    *   isFieldTouched(name: String): Bool
        获取 field 是否被用户做过更改
    *   isFieldsTouched(names: String[]): Bool
        是否其中存在 field 被用户做过更改
    *   resetFields([names: String[]])
        初始化/重置对应的 field

*   更多使用细节查看下方的演示

*   如果需要查看更多内容请看[rc-form 文档](https://github.com/react-component/form#option-object)

### 注意事项

*   formDecorator 包裹的表单不能为 stateless/functional 组件
*   controllerDecorator 包裹的表单控件也不能为 stateless/functional 组件
*   zName 必须为唯一值

### 演示

*   普通使用

```js {"codepath": "base.jsx"}
```

*   自定义校验规则

```js {"codepath": "rule.jsx"}
```

*   使用 zName 定义表单数据结构

```js {"codepath": "name.jsx"}
```

*   模拟主机创建表单

```js {"codepath": "uhost.jsx"}
```
