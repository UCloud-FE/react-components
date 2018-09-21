import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
const options = [1, 2, 3];
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox.Group options={options.map(v => ({ value: v }))} />
                </div>
                <div className="demo-wrap">
                    <Checkbox.Group disabled options={options.map(v => ({ value: v }))} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
