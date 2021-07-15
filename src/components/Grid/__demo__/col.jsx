import React from 'react';
import Grid from 'src/components/Grid';
import NumberInput from 'src/components/NumberInput';
import Form from 'src/components/Form';

// demo start
const { Row, Col } = Grid;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            span: 1,
            offset: 0,
            pull: 0,
            push: 0
        };
    }
    render() {
        const { span, offset, pull, push } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const wrapStyle = {
            padding: '10px 0',
            border: '1px solid #ccc'
        };
        const contentStyle = { background: '#888', height: 20, border: '1px solid #111' };
        return (
            <div>
                <Form className="demo-form">
                    {['span', 'offset', 'pull', 'push'].map(key => (
                        <Form.Item label={key} key={key} {...itemLayout}>
                            <NumberInput
                                value={this.state[key]}
                                min={0}
                                max={12}
                                onNumberChange={v =>
                                    this.setState({
                                        [key]: v
                                    })
                                }
                            />
                        </Form.Item>
                    ))}
                </Form>
                <div style={wrapStyle}>
                    <Row type="flex">
                        <Col span={1}>
                            <div style={contentStyle} />
                        </Col>
                        <Col span={span} offset={offset} pull={pull} push={push} style={{ zIndex: 10 }}>
                            <div
                                style={{
                                    ...contentStyle,
                                    background: 'red',
                                    textAlign: 'center',
                                    lineHeight: '20px',
                                    color: 'white'
                                }}
                            >
                                target
                            </div>
                        </Col>
                        <Col span={1}>
                            <div style={contentStyle} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
