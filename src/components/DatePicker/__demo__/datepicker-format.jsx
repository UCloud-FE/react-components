import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
const formats = [
    'YYYYMMDD hh:mm:ss',
    'YYYY-M-D h:m:s',
    'YY-M-D h:m:s',
    ['YYYY-MM-DD hh:mm:ss', 'YYYY-M-D h:m:s', 'YY-M-D h:m:s']
];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {formats.map((format, i) => {
                    return (
                        <div className="demo-wrap" key={i}>
                            <DatePicker format={format} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
// demo end

export default Demo;
