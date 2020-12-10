import React from 'react';

import Checkbox from 'src/components/Checkbox';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';

// demo start
const { Size, StyleType } = Checkbox;
class Demo extends React.Component {
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

export default Demo;
