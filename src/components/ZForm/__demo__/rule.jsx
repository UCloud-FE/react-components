/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
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

class Select extends React.Component {
    render() {
        const { options, ...selectProps } = this.props;
        return (
            <select {...selectProps}>
                <option>请选择</option>
                {options.map(option => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
}
Select.propTypes = {
    options: PropTypes.array.isRequired
};
const ZSelect = controllerDecorator()(Select);

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
                <Item label="input_3" {...itemLayout}>
                    <ZInput zName="input_3" />
                </Item>
                <Item label="checkbox_1" {...itemLayout}>
                    <ZCheckbox zName="checkbox_1" />
                </Item>
                <Item label="select_1" {...itemLayout}>
                    <ZSelect zName="select_1" options={[1, 2, 3, 4]} />
                </Item>
                <Item label="select_2" {...itemLayout}>
                    <ZSelect zName="select_2" zOptions={{ initialValue: 1 }} options={[1, 2, 3, 4]} />
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
