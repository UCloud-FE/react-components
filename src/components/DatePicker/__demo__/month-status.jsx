import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker type="month" />
                </div>
                <div className="demo-wrap">
                    <DatePicker type="month" status="error" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
