import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker.Month />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Month status="error" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
