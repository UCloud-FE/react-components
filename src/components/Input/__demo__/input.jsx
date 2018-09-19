import React from 'react';
import Input from 'components/Input';
import Radio from 'components/Radio';
import Form from 'components/Form';
import Switch from 'components/Switch';

// demo start
const { Size } = Input;
const IconType = ['circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            icon: IconType[0]
        };
    }
    render() {
        const { size, icon, disabled } = this.state;
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
                            value={size}
                            onChange={size => this.setState({ size })}
                            options={Size.map(size => ({
                                value: size
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={IconType.map(icon => ({ value: icon }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Input size={size} disabled={disabled} icon={icon} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
