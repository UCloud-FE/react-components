import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker.Month
                        display={{
                            date: {
                                format: 'YYYY---MM'
                            }
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Month />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
