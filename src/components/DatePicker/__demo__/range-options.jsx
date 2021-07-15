import React from 'react';
import DatePicker from 'src/components/DatePicker';

// demo start
const Demo = () => (
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
                onChange={console.log}
            />
        </div>
    </div>
);
// demo end

export default Demo;
