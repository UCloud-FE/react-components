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
const { Item, SubArea } = Form;

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
                span: 2
            },
            controllerCol: {
                span: 5
            }
        };
        const error1 = getError(originErrors, 'input_1');
        const error3 = getError(originErrors, 'input_3');
        const subError1 = getError(originErrors, 'sub_item_1');
        console.log(originErrors);
        return (
            <ZForm form={form} itemProps={{ ...itemLayout, shareStatus: true }}>
                <Item label="input_1" {...(error1 ? { status: 'error', tip: error1.join(',') } : {})}>
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
                <Item label="input_2">
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
                <Item label="input_4">
                    <ZInput
                        zName="input_4"
                        zOptions={{
                            rules: [
                                {
                                    required: true
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        callback(null);
                                    }
                                }
                            ]
                        }}
                    />
                </Item>
                <Item label="checkbox_1">
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="select_1">
                    <ZSelect zName="select_1" options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))} />
                </Item>
                <Item label="select_2">
                    <ZSelect
                        zName="select_2"
                        zOptions={{ initialValue: 1 }}
                        options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                    />
                </Item>
                <Item label="区域">
                    <SubArea>
                        <Item label="sub_item_1" {...(subError1 ? { status: 'error', tip: subError1.join(',') } : {})}>
                            <ZSelect
                                zName="sub_item_1"
                                zOptions={{
                                    rules: [
                                        {
                                            required: true
                                        }
                                    ]
                                }}
                                options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                            />
                        </Item>
                        <Item label="sub_item_2">
                            <ZSelect
                                zName="sub_item_2"
                                zOptions={{ initialValue: 1 }}
                                options={[1, 2, 3, 4].map(v => ({ value: v, label: `label-${v}` }))}
                            />
                        </Item>
                    </SubArea>
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
