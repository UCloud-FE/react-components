import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
const format = 'YYYY-MM-DD HH:mm:ss';
const Demo = () => (
    <div>
        {[
            {
                customRender: {
                    // eslint-disable-next-line react/display-name
                    readonlyDisplay: (value = []) => (
                        <span style={{ border: '1px dashed blue', padding: '8px 16px' }}>
                            {value[0] ? value[0].format(format) : ''} - {value[1] ? value[1].format(format) : ''}
                        </span>
                    )
                }
            },
            {}
        ].map((props, i) => (
            <div className="demo-wrap" key={i}>
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
                    defaultOption={'1hour'}
                    {...props}
                />
            </div>
        ))}
    </div>
);
// demo end

export default Demo;
