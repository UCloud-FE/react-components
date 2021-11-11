import React from 'react';
import moment from 'moment';
import DatePicker from 'src/components/DatePicker';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';

// demo start
const { Sizes } = DatePicker;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: {
                date: {
                    format: 'YY-MM'
                }
            },
            size: 'md'
        };
    }
    render() {
        const { display, size, disabled } = this.state;
        const { date } = display;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="size" {...itemLayout}>
                        <Radio.Group
                            value={size}
                            options={Sizes.map(value => ({ value }))}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <DatePicker
                        type="month"
                        display={display}
                        size={size}
                        onChange={v => console.log(v.format())}
                        disabled={disabled}
                        rules={{
                            range: [
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: -7 }),
                                moment().set({ hour: 0, minute: 0, second: 0 }).add({ month: 7 })
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
