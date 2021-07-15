import React from 'react';
import DatePicker from 'src/components/DatePicker';

// demo start
const Display = [{ second: false }, { minute: false }, { hour: false }, { date: { format: 'YY:MM:DD' } }];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Display.map((display, i) => (
                    <div className="demo-wrap" key={i}>
                        <DatePicker display={display} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
