// @ts-nocheck
import { Form, Icon, NumberInput, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';

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
        const layout = {
            style: {
                marginRight: 10
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
                <Form.Group title="spin">
                    <Icon type="link" spin {...layout} style={{ fontSize: fontSize, color }} />
                    <Icon type="check" spin {...layout} style={{ fontSize: fontSize, color }} />
                    <Icon type="circle-check" spin {...layout} style={{ fontSize: fontSize, color }} />
                    <Icon type="arrow-left" spin {...layout} style={{ fontSize: fontSize, color }} />
                    <Icon type="checkbox" spin {...layout} style={{ fontSize: fontSize, color }} />
                    <Icon type="loading" spin {...layout} style={{ fontSize: fontSize, color }} />
                </Form.Group>
            </div>
        );
    }
}
// demo end

export default Demo;
