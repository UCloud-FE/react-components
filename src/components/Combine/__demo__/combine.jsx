import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Icon from 'src/components/Icon';

// demo start
const { Size } = Input;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            spacing: 'smart',
            separator: 'default'
        };
    }
    render() {
        const { size, disabled, spacing, separator } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {};
        switch (separator) {
            case '-':
                props.separator = '-';
                break;
            case 'icon':
                props.separator = <Icon type="arrow-right" />;
                break;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="spacing" {...itemLayout}>
                        <Radio.Group
                            value={spacing}
                            onChange={spacing => this.setState({ spacing })}
                            options={['smart', 'compact', 'sm', 'md', 'lg'].map(spacing => ({
                                value: spacing
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="separator" {...itemLayout}>
                        <Radio.Group
                            value={separator}
                            onChange={separator => this.setState({ separator })}
                            options={['default', '-', 'icon'].map(separator => ({
                                value: separator
                            }))}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Combine sharedProps={{ size, disabled }} spacing={spacing} {...props}>
                        <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                        <Input />
                    </Combine>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
