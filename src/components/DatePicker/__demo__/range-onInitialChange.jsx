import React from 'react';
import moment from 'moment';
import DatePicker from 'src/components/DatePicker';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }
    handleChange(value) {
        this.setState({ value });
    }
    render() {
        const { value } = this.state;
        return (
            <div>
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
                        value={value}
                        defaultOption="2hour"
                        rules={{
                            range: [moment().add({ month: -1 }), moment().add({ month: 1 })],
                            maxRange: {
                                month: 1
                            },
                            minRange: {
                                day: 6
                            }
                        }}
                        onChange={v => this.handleChange(v)}
                        onInitialChange={v => this.handleChange(v)}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
