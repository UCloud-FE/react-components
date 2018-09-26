import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker.Range hideOptions />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
