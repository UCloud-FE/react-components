import React from 'react';
import DatePicker from 'components/DatePicker';

// demo start
const { Sizes } = DatePicker;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Sizes.map(size => (
                    <div className="demo-wrap" key={size}>
                        <DatePicker.Month size={size} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
