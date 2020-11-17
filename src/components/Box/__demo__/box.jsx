import React from 'react';

import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Input from 'src/components/Input';
import Box from 'src/components/Box';

// demo start
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Spacing = Box.Spacing;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spacing: null
        };
    }
    render() {
        const { spacing, wrap, direction, alignItems, alignContent, justifyContent } = this.state;
        const props = {
            spacing: spacing === 'custom' ? ['sm', 100] : spacing,
            wrap,
            direction,
            alignItems,
            alignContent,
            justifyContent
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Group title="props for container">
                        <Form.Item label="spacing" {...itemLayout}>
                            <Radio.Group
                                options={[
                                    { value: null, label: 'default' },
                                    ...Spacing.map(v => ({ value: v, label: v })),
                                    { value: 'custom', label: `['sm', 100]` }
                                ]}
                                value={spacing}
                                onChange={spacing => this.setState({ spacing })}
                            />
                        </Form.Item>
                        <Form.Item label="wrap" {...itemLayout}>
                            <Radio.Group
                                options={['nowrap', 'wrap', 'wrap-reverse'].map(v => ({ value: v, label: v }))}
                                value={wrap}
                                onChange={wrap => this.setState({ wrap })}
                            />
                        </Form.Item>
                        <Form.Item label="direction" {...itemLayout}>
                            <Radio.Group
                                options={['row', 'row-reverse', 'column', 'column-reverse'].map(v => ({
                                    value: v,
                                    label: v
                                }))}
                                value={direction}
                                onChange={direction => this.setState({ direction })}
                            />
                        </Form.Item>
                        <Form.Item label="alignItems" {...itemLayout}>
                            <Radio.Group
                                options={['center', 'flex-start', 'flex-end', 'stretch'].map(v => ({
                                    value: v,
                                    label: v
                                }))}
                                value={alignItems}
                                onChange={alignItems => this.setState({ alignItems })}
                            />
                        </Form.Item>
                        <Form.Item label="alignContent" {...itemLayout}>
                            <Radio.Group
                                options={['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(
                                    v => ({
                                        value: v,
                                        label: v
                                    })
                                )}
                                value={alignContent}
                                onChange={alignContent => this.setState({ alignContent })}
                            />
                        </Form.Item>
                        <Form.Item label="justifyContent" {...itemLayout}>
                            <Radio.Group
                                options={[
                                    'center',
                                    'flex-start',
                                    'flex-end',
                                    'space-between',
                                    'space-around',
                                    'stretch'
                                ].map(v => ({
                                    value: v,
                                    label: v
                                }))}
                                value={justifyContent}
                                onChange={justifyContent => this.setState({ justifyContent })}
                            />
                        </Form.Item>
                    </Form.Group>
                </Form>
                <div className="demo-wrap">
                    <Box container {...props}>
                        {new Array(12).fill(null).map((v, i) => (
                            <Box key={i} span={2}>
                                <div
                                    style={{
                                        height: '100px',
                                        lineHeight: '100px',
                                        background: 'gray',
                                        textAlign: 'center',
                                        border: '1px solid green',
                                        color: 'white'
                                    }}
                                >
                                    box {i}
                                </div>
                            </Box>
                        ))}
                    </Box>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
