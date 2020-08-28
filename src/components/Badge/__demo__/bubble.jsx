import React from 'react';

import Badge from 'src/components/Badge';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
import NumberInput from 'src/components/NumberInput';
import Radio from 'src/components/Radio';
import Button from 'src/components/Button';
import Combine from 'src/components/Combine';

// demo start
const { StyleType, defaultProps } = Badge.Bubble;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bubble: 'bubble',
            styleType: defaultProps.styleType,
            offset: defaultProps.offset
        };
    }
    forceAlign() {
        this.badge && this.badge.forceAlign();
    }
    render() {
        const { bubble, styleType, bubbleColor, bubbleBackground, offset } = this.state;
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
                    <Form.Item label="bubble" {...itemLayout}>
                        <Input value={bubble} onChange={e => this.setState({ bubble: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            value={styleType}
                            options={StyleType.map(v => ({ value: v, label: v }))}
                            onChange={v => this.setState({ styleType: v })}
                        />
                    </Form.Item>
                    <Form.Item label="offset[0]" {...itemLayout}>
                        <NumberInput
                            value={offset[0]}
                            onNumberChange={v =>
                                this.setState({
                                    offset: [v, offset[1]]
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="offset[1]" {...itemLayout}>
                        <NumberInput
                            value={offset[1]}
                            onNumberChange={v =>
                                this.setState({
                                    offset: [offset[0], v]
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="customStyle.bubbleColor" {...itemLayout}>
                        <Combine>
                            <input type="color" onChange={e => this.setState({ bubbleColor: e.target.value })} />
                            <Button styleType="primary" onClick={() => this.setState({ bubbleColor: null })}>
                                Remove Color
                            </Button>
                        </Combine>
                    </Form.Item>
                    <Form.Item label="customStyle.bubbleBackground" {...itemLayout}>
                        <Combine>
                            <input type="color" onChange={e => this.setState({ bubbleBackground: e.target.value })} />
                            <Button styleType="primary" onClick={() => this.setState({ bubbleBackground: null })}>
                                Remove Background
                            </Button>
                        </Combine>
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Badge.Bubble
                        bubble={bubble}
                        styleType={styleType}
                        offset={offset}
                        customStyle={{ bubbleColor, bubbleBackground }}
                        style={{ margin: 10 }}
                    >
                        <div style={{ width: 50, height: 50, background: '#ddd' }} />
                    </Badge.Bubble>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
