/* eslint-disable no-console */
import React from 'react';
import ZForm from 'components/ZForm';
import Form from 'components/Form';

// demo start
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
class Input extends React.Component {
    render() {
        return <input {...this.props} />;
    }
}
const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

class Checkbox extends React.Component {
    render() {
        return <input type="checkbox" {...this.props} />;
    }
}
const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

class DemoForm extends React.Component {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;

        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 5
            }
        };
        const renderInputArray = () => {
            const inputArray = [];
            for (let i = 0; i < 3; i++) {
                inputArray.push(
                    <Item label={`input ${i}`} key={i} {...itemLayout}>
                        <ZInput zName={`input[${i}]`} />
                    </Item>
                );
            }
            return inputArray;
        };
        const renderCheckboxObject = () => {
            const checkboxArray = [];
            const checkboxObject = {
                first: true,
                second: false,
                third: false
            };
            for (const key in checkboxObject) {
                checkboxArray.push(
                    <Item label={`checkbox ${key}`} key={key} {...itemLayout}>
                        <ZCheckbox
                            zName={`checkbox.${key}`}
                            zOptions={{
                                initialValue: checkboxObject[key]
                            }}
                        />
                    </Item>
                );
            }
            return checkboxArray;
        };
        return (
            <ZForm form={form}>
                {renderInputArray()}
                {renderCheckboxObject()}
                <Item label="a.b.c.d" {...itemLayout}>
                    <ZInput zName="a.b.c.d" />
                </Item>
                <Item label="r[0][1][2][3]" {...itemLayout}>
                    <ZInput zName="r[0][1][2][3]" />
                </Item>
                <Item label="z[0].a[1].b[2]" {...itemLayout}>
                    <ZInput zName="z[0].a[1].b[2]" />
                </Item>
                <button type="button" onClick={() => this.handleSubmit()}>
                    submit
                </button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
// demo end

export default Demo;
