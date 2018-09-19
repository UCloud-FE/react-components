import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
const { Size } = Checkbox;
const options = [1, 2, 3];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Checkbox.Group size={size} options={options.map(v => ({ value: v }))} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
