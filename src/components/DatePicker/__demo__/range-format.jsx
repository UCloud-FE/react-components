import React from 'react';

import DatePicker from 'src/components/DatePicker';

// demo start
const formats = [
    'YYYYMMDD HH:mm:ss',
    'YYYY-M-D H:m:s',
    'YY-M-D H:m:s',
    'YYYY-MM-DD',
    ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'YY-M-D H:m:s']
];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {formats.map((format, i) => {
                    return (
                        <div className="demo-wrap" key={i}>
                            <DatePicker.Range format={format} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
// demo end

export default Demo;
