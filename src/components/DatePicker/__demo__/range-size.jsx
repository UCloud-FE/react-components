import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
const { Size } = DatePicker;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <DatePicker.Range size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
