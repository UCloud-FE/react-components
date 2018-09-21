import React from 'react';
import Button from 'components/Button';
import Form from 'components/Form';
import Radio from 'components/Radio';
import Switch from 'components/Switch';

// demo start
const { StyleType, Size, Shape } = Button;
const IconType = ['circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: StyleType[0],
            size: Size[0],
            shape: 'undefined',
            icon: IconType[0],
            disabled: false
        };
    }
    render() {
        const { styleType, size, shape, icon, loading, disabled } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        const props = {
            styleType,
            shape,
            size,
            icon,
            loading,
            disabled
        };
        if (shape === 'undefined') {
            delete props.shape;
        }
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="shape" {...itemLayout}>
                        <Radio.Group
                            options={['undefined', ...Shape].map(shape => ({ value: shape }))}
                            value={shape}
                            onChange={shape => this.setState({ shape })}
                        />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={IconType.map(icon => ({ value: icon }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="loading" {...itemLayout}>
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <Button {...props} onClick={console.log}>
                    Button
                </Button>
            </div>
        );
    }
}
// demo end

export default Demo;
