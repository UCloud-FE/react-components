import React from 'react';
import Icon from 'components/Icon';
import Form from 'components/Form';
import Radio from 'components/Radio';
import Switch from 'components/Switch';
import NumberInput from 'components/NumberInput';

// demo start
const Type = ['circle-fill', 'circle', 'loading'];
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: Type[0],
            spin: false,
            fontSize: 12,
            color: '#000'
        };
    }
    render() {
        const { type, spin, fontSize, color } = this.state;
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
                    <Form.Item label="type" {...itemLayout}>
                        <Radio.Group
                            options={Type.map(type => ({ value: type }))}
                            value={type}
                            onChange={type => this.setState({ type })}
                        />
                    </Form.Item>
                    <Form.Item label="spin" {...itemLayout}>
                        <Switch checked={spin} onChange={spin => this.setState({ spin })} />
                    </Form.Item>
                    <Form.Item label="fontSize" {...itemLayout}>
                        <NumberInput
                            value={fontSize}
                            min={12}
                            max={100}
                            onNumberChange={fontSize => this.setState({ fontSize })}
                        />
                    </Form.Item>
                    <Form.Item label="color" {...itemLayout}>
                        <input type="color" value={color} onChange={e => this.setState({ color: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Icon {...{ type, spin }} style={{ fontSize: fontSize, color }} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
