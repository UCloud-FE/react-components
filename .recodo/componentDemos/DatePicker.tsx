// @ts-nocheck
import { Box, Checkbox, DatePicker, Form, Radio, Switch } from '@ucloud-fe/react-components';
import moment from 'moment';
import React from 'react';

// demo start

class RangeDemo extends React.Component {
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

var { Group, Size, StyleType } = Checkbox;
const { Sizes } = DatePicker;
const Demo = () => {
    const itemLayout = {
        labelCol: { span: 3 },
        controllerCol: { span: 9 }
    };
    const [nullable, setNullable] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [size, setSize] = React.useState('md');
    const [display, setDisplay] = React.useState({
        date: {
            format: 'YY-MM-DD',
            display: false
        },
        hour: true,
        minute: true,
        second: true
    });
    const [status, setStatus] = React.useState('default');

    const displayValueMap = ['hour', 'minute', 'second'];
    const [displayValue, setDisplayValue] = React.useState(displayValueMap);
    return (
        <Box container direction="column" spacing="lg">
            <Form className="demo-form">
                <Form.Item label="nullable" {...itemLayout}>
                    <Switch checked={nullable} onChange={(nullable: boolean) => setNullable(nullable)} />
                </Form.Item>

                <Form.Item label="disabled" {...itemLayout}>
                    <Switch checked={disabled} onChange={(disabled: boolean) => setDisabled(disabled)} />
                </Form.Item>
                <Form.Item label="display" {...itemLayout}>
                    <Group
                        value={displayValue}
                        onChange={(value: string[]) => {
                            setDisplayValue(value);
                            setDisplay({
                                ...display,
                                ...(value.find(v => v === 'hour') ? { hour: true } : { hour: false }),
                                ...(value.find(v => v === 'minute') ? { minute: true } : { minute: false }),
                                ...(value.find(v => v === 'second') ? { second: true } : { second: false })
                            });
                        }}
                        options={displayValueMap.map(v => ({ value: v }))}
                    />
                </Form.Item>
                <Form.Item label="size" {...itemLayout}>
                    <Radio.Group
                        value={size}
                        options={Sizes.map((value: string) => ({ value }))}
                        onChange={size => setSize(size)}
                    />
                </Form.Item>
                <Form.Item label="status" {...itemLayout}>
                    <Radio.Group
                        value={status}
                        options={['default', 'error'].map((value: string) => ({ value }))}
                        onChange={status => setStatus(status)}
                    />
                </Form.Item>
            </Form>
            <div className="demo-wrap">
                <DatePicker
                    display={display}
                    size={size}
                    onChange={(v: any) => console.log(v && v.format())}
                    disabled={disabled}
                    nullable={nullable}
                    status={status}
                    rules={{
                        range: [
                            moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: -7 }),
                            moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: 7 })
                        ]
                    }}
                />
            </div>

            <Box spacing="md">
                <DatePicker />
                <DatePicker disabled />
            </Box>
            <Box spacing="md">
                <DatePicker nullable />
                <DatePicker nullable disabled />
            </Box>
            <Box spacing="md">
                <DatePicker.Range />
                <DatePicker.Range disabled />
            </Box>
            <Box spacing="md">
                <DatePicker.Range nullable={[true, true]} />
                <DatePicker.Range nullable={[true, true]} disabled />
            </Box>

            <Form.Group title="时间范围选择">
                <RangeDemo />
            </Form.Group>
        </Box>
    );
};

export default React.memo(Demo);
