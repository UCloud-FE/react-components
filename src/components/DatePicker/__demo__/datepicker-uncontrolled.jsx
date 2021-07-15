import React from 'react';
import DatePicker from 'src/components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker value={Date.now()} />
                </div>
                <div className="demo-wrap">
                    <DatePicker />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
