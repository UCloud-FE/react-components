import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
const formats = ['YYYYMM', 'YYYY-M', 'YY-M', ['YYYY-MM', 'YYYY-M', 'YY-M']];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {formats.map((format, i) => {
                    return (
                        <div className="demo-wrap" key={i}>
                            <DatePicker type="month" format={format} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
// demo end

export default Demo;
