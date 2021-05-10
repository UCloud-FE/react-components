import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker.Range
                        display={{
                            date: {
                                format: 'YYYY-MM'
                            },
                            second: false
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range
                        display={{
                            range: {
                                format: 'YY-MM-DD HH:mm'
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
