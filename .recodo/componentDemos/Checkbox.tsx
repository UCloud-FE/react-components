// @ts-nocheck
import { Box, Checkbox, CheckboxProps, Form, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start
const { Group, Size, StyleType } = Checkbox;
class GroupDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [1],
            size: 'md',
            styleType: 'default',
            disabled: false,
            options: [1, 2, 3, 4]
        };
    }
    render() {
        const { size, styleType, disabled, options, value } = this.state;
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
                    <Form.Item label="value" {...itemLayout}>
                        <Checkbox.Group
                            options={options.map(value => ({ value }))}
                            value={value}
                            onChange={value => this.setState({ value })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Group
                        value={value}
                        onChange={value => {
                            console.log(value);
                            this.setState({ value });
                        }}
                        disabled={disabled}
                        size={size}
                        styleType={styleType}
                        options={options.map(v => ({
                            value: v
                        }))}
                    />
                </div>
            </div>
        );
    }
}
// demo end

// demo start

class BaseDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            size: 'md',
            styleType: 'default',
            disabled: false
        };
    }
    render() {
        const { checked, size, styleType, disabled, indeterminate } = this.state;
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
                    <Form.Item label="indeterminate" {...itemLayout}>
                        <Switch
                            indeterminate={indeterminate}
                            onChange={indeterminate => this.setState({ indeterminate })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Checkbox
                        checked={checked}
                        indeterminate={indeterminate}
                        size={size}
                        styleType={styleType}
                        disabled={disabled}
                        title="title"
                        disabledLabel="售磬"
                        onChange={checked => {
                            console.log(checked);
                            this.setState({ checked });
                        }}
                    >
                        checkbox
                    </Checkbox>
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
        { props: { checked: true, value: 'checkedDisabled', disabled: true }, label: '选中且禁用' },
        { props: { indeterminate: true, value: 'indeterminate' }, label: '部分选中' },
        { props: { indeterminate: true, value: 'indeterminate', disabled: true }, label: '部分选中且禁用' }
    ];
    const styleTypes: CheckboxProps['styleType'][] = ['default', 'card'];
    return (
        <Box container direction="column" spacing="lg">
            <BaseDemo />
            <Form.Group title="Group">
                <GroupDemo />
            </Form.Group>
            {styleTypes.map(styleType => (
                <Box spacing="md" key={styleType}>
                    {list.map(({ props, label }) => (
                        <Checkbox styleType={styleType} title="标题" {...props}>
                            {label}
                        </Checkbox>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
