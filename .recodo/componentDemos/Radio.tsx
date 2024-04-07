// @ts-nocheck
import { Box, Form, Radio, RadioStyleType, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start

class GroupDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            styleType: StyleType[0],
            size: 'md',
            disabled: false
        };
    }
    render() {
        const { size, disabled, styleType, value } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const options = [1, 2, 3];
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="value" {...itemLayout}>
                        <Radio.Group
                            options={options.map(option => ({ value: option }))}
                            value={value}
                            onChange={value => this.setState({ value })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Radio.Group onChange={value => this.setState({ value })} {...this.state}>
                        {options.map(v => (
                            <Radio key={v} value={v}>
                                {v}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </div>
        );
    }
}

// demo end

// demo start
const { Size, StyleType } = Radio;
class Demo1 extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            styleType: StyleType[0],
            size: 'md',
            disabled: false,
            checked: false
        };
    }
    render() {
        const { size, disabled, styleType, checked } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="checked" {...itemLayout}>
                        <Switch checked={checked} onChange={checked => this.setState({ checked })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Radio
                        {...this.state}
                        title={this.state.styleType}
                        onChange={checked => this.setState({ checked })}
                    >
                        checked
                    </Radio>
                </div>
            </div>
        );
    }
}

// demo end

const Demo = () => {
    const list = [
        { props: { checked: true, value: 'checked' }, label: '选中' },
        { props: { checked: false, value: 'unchecked' }, label: '默认' },
        { props: { disabled: true, value: 'disabled' }, label: '禁用' },
        { props: { checked: true, value: 'checkedDisabled', disabled: true }, label: '选中且禁用' }
    ];
    const styleTypes: RadioStyleType[] = ['default', 'button', 'card', 'list'];
    return (
        <Box container direction="column" spacing="lg">
            <Demo1 />
            <Form.Group title="Group">
                <GroupDemo />
            </Form.Group>
            {styleTypes.map(styleType => (
                <Box spacing="md" key={styleType}>
                    {list.map(({ props, label }) => (
                        <Radio styleType={styleType} title="标题" extra="备注" {...props}>
                            {label}
                        </Radio>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
