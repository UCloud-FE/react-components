import React from 'react';
import moment from 'moment';
import DatePicker from 'components/DatePicker';
import Switch from 'components/Switch';
import Form from 'components/Form';
import Input from 'components/Input';
import Radio from 'components/Radio';

// demo start
const { Size } = DatePicker;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: {
                date: {
                    format: 'YY-MM-DD',
                    display: false
                },
                hour: true,
                minute: true,
                second: true
            },
            size: 'md'
        };
    }
    render() {
        const { display, disabled, size } = this.state;
        const { date, hour, minute, second } = display;
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
                    <Form.Item label="display.date.format" {...itemLayout}>
                        <Input
                            value={date.format}
                            onChange={e =>
                                this.setState({
                                    display: {
                                        ...display,
                                        date: {
                                            ...date,
                                            format: e.target.value
                                        }
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.hour" {...itemLayout}>
                        <Switch
                            checked={hour}
                            onChange={hour =>
                                this.setState({
                                    display: {
                                        ...display,
                                        hour
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.minute" {...itemLayout}>
                        <Switch
                            checked={minute}
                            onChange={minute =>
                                this.setState({
                                    display: {
                                        ...display,
                                        minute
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="display.second" {...itemLayout}>
                        <Switch
                            checked={second}
                            onChange={second =>
                                this.setState({
                                    display: {
                                        ...display,
                                        second
                                    }
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Size.map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <DatePicker
                        display={display}
                        size={size}
                        onChange={v => console.log(v.format())}
                        disabled={disabled}
                        rules={{
                            range: [
                                moment()
                                    .set({ hour: 0, minute: 0, second: 0 })
                                    .add({ day: -7 }),
                                moment()
                                    .set({ hour: 0, minute: 0, second: 0 })
                                    .add({ day: 7 })
                            ]
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
