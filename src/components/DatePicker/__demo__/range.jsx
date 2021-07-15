import React from 'react';
import moment from 'moment';
import DatePicker from 'src/components/DatePicker';
import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';

// demo start
const { Sizes } = DatePicker;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'md',
            type: 'date'
        };
    }
    render() {
        const { size, type, disabled, nullableS, nullableE } = this.state;
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
                            value={type}
                            options={['date', 'month'].map(value => ({ value }))}
                            onChange={type => this.setState({ type })}
                        />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="nullable[0]" {...itemLayout}>
                        <Switch checked={nullableS} onChange={nullableS => this.setState({ nullableS })} />
                    </Form.Item>
                    <Form.Item label="nullable[1]" {...itemLayout}>
                        <Switch checked={nullableE} onChange={nullableE => this.setState({ nullableE })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <DatePicker.Range
                        options={[
                            {
                                label: '一小时前',
                                value: '1hour',
                                range: {
                                    start: {
                                        hours: -1
                                    }
                                }
                            },
                            {
                                label: '二小时后',
                                value: '2hour',
                                range: {
                                    end: {
                                        hours: 2
                                    }
                                }
                            },
                            {
                                label: '前一后一',
                                value: '(-1)-(1)',
                                range: {
                                    start: {
                                        hours: -1
                                    },
                                    end: {
                                        hours: 1
                                    }
                                }
                            }
                        ]}
                        {...{
                            size,
                            type,
                            disabled,
                            nullable: [nullableS, nullableE]
                        }}
                        rules={{
                            range: [moment().add({ month: -1 }), moment().add({ month: 1 })],
                            maxRange: {
                                month: 1
                            },
                            minRange: {
                                day: 6
                            }
                        }}
                        onChange={console.log}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
