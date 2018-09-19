import React from 'react';
import Grid from 'components/Grid';
import Radio from 'components/Radio';
import Switch from 'components/Switch';
import NumberInput from 'components/NumberInput';
import Form from 'components/Form';

// demo start
const { Row, Col } = Grid;
const { Align, Justify } = Row;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            align: Align[0],
            justify: Justify[0],
            flex: false,
            gutter: 16
        };
    }
    render() {
        const { align, justify, flex, gutter } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const wrapStyle = {
            height: 40,
            border: '1px solid #ccc'
        };
        const contentStyle = { background: '#888', height: 20, border: '1px solid #111' };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="flex" {...itemLayout}>
                        <Switch
                            checked={flex}
                            onChange={flex =>
                                this.setState({
                                    flex
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="align" {...itemLayout}>
                        <Radio.Group
                            value={align}
                            options={Align.map(v => ({ value: v }))}
                            onChange={align =>
                                this.setState({
                                    align
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="justify" {...itemLayout}>
                        <Radio.Group
                            value={justify}
                            options={Justify.map(v => ({ value: v }))}
                            onChange={justify =>
                                this.setState({
                                    justify
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="gutter" {...itemLayout}>
                        <NumberInput
                            value={gutter}
                            min={0}
                            onNumberChange={gutter =>
                                this.setState({
                                    gutter
                                })
                            }
                        />
                    </Form.Item>
                </Form>
                <div style={wrapStyle}>
                    <Row
                        align={align}
                        justify={justify}
                        style={{ height: '100%' }}
                        type={flex ? 'flex' : undefined}
                        gutter={gutter}
                    >
                        {[1, 2, 3].map((v, i) => (
                            <Col key={i} span={3}>
                                <div style={contentStyle} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
