/* eslint-disable no-console */
import React from 'react';
import _ from 'lodash';
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
        const originErrors = form.getFieldsError() || [];

        const errors = [];
        _.each(originErrors, (errs, name) => {
            errs !== undefined &&
                errors.push({
                    name,
                    message: errs.join(', ')
                });
        });
        const itemLayout = {
            labelCol: {
                span: 1
            },
            controllerCol: {
                span: 5
            }
        };
        return (
            <ZForm form={form}>
                <Item label="input_1" {...itemLayout}>
                    <ZInput zName="input_1" />
                </Item>
                <Item label="input_2" {...itemLayout}>
                    <ZInput zName="input_2" zOptions={{ rules: [{ required: true }] }} />
                    {form.getField}
                </Item>
                <Item label="input_3" {...itemLayout}>
                    <ZInput zName="input_3" />
                </Item>
                <Item label="checkbox_1" {...itemLayout}>
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="checkbox_2" {...itemLayout}>
                    <ZCheckbox
                        zName="checkbox_2"
                        zOptions={{
                            initialValue: false
                        }}
                    />
                </Item>
                <p className="u-red">{errors.map(error => `${error.name}: ${error.message}`).join(', ')}</p>

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
