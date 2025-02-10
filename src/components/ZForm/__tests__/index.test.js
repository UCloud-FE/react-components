import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import React from 'react';
import ZForm from 'src/components/ZForm';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
import _ from 'lodash';

jest.unmock('rc-trigger');



const getError = (error, key) => {
    return _.get(error, key);
};

describe('ZForm', () => {
    test('zform rules', () => {
        const { formDecorator,controllerDecorator } = ZForm;
        const { Item } = Form;
        const ZInput = controllerDecorator({
            initialValue: ''
        })(Input);
        
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
            
                return (
                    <ZForm form={form} itemProps={{ ...itemLayout, shareStatus: true }}>
                      
                        <Item label="input_1">
                            <ZInput
                                zName="input_1"
                                {...(error1 ? { status: 'error', tip: error1.join(',') } : { tip: 'this is required' })}
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
                     
        
                        <button  onClick={() => this.handleSubmit()}>
                            submit
                        </button>
                    </ZForm>
                );
            }
        }
        DemoForm.propTypes = {
            form: PropTypes.object, // 确保 form 是一个必需的对象
        };
        const Demo = formDecorator()(DemoForm);
      
        
        const wrapper = mount(
            <Demo/>
        );
        const Butt = wrapper.find('button');
        Butt.simulate('click');
    });
});