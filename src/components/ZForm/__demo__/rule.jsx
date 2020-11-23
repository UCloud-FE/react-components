/* eslint-disable no-console */
import React from 'react';
import _ from 'lodash';

import ZForm from 'src/components/ZForm';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
import Checkbox from 'src/components/Checkbox';
import Select from 'src/components/Select';
import Button from 'src/components/Button';

// demo start
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;

const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

const ZCheckbox = controllerDecorator({
    initialValue: true,
    valuePropName: 'checked'
})(Checkbox);

const ZSelect = controllerDecorator()(Select);

const getError = (error, key) => {
    return _.get(error, key);
};

class DemoForm extends React.PureComponent {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const itemLayout = {
            labelCol: {
                span: 1
            },
            controllerCol: {
                span: 5
            }
        };
        const error1 = getError(originErrors, 'input_1');
        const error3 = getError(originErrors, 'input_3');
        console.log(error1, error3);
        return (
            <ZForm form={form}>
                <Item label="input_1" {...(error1 ? { status: 'error', tip: error1.join(',') } : {})} {...itemLayout}>
                    <ZInput
                        zName="input_1"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="input_2" {...itemLayout}>
                    <ZInput
                        zName="input_2"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.length < 6) {
                                            callback('at least 6 char');
                                        } else {
                                            callback();
                                        }
                                    }
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        if (value.length > 10) {
                                            callback('less then 6 char');
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            ]
                        }}
                    />
                </Item>
                <Item
                    label="input_3"
                    {...(error3 ? { status: 'error', tip: error3.join(',') } : { tip: 'this is required' })}
                    {...itemLayout}
                >
                    <ZInput
                        zName="input_3"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="checkbox_1" {...itemLayout}>
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="select_1" {...itemLayout}>
                    <ZSelect zName="select_1" options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))} />
                </Item>
                <Item label="select_2" {...itemLayout}>
                    <ZSelect
                        zName="select_2"
                        zOptions={{ initialValue: 1 }}
                        options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                    />
                </Item>

                <Button styleType="primary" onClick={() => this.handleSubmit()}>
                    submit
                </Button>
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
