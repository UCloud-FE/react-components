import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <DatePicker.Range />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range nullable={[true, true]} />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range nullable={[false, true]} />
                </div>
                <div className="demo-wrap">
                    <DatePicker.Range nullable={[true, false]} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
