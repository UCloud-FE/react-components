import React from 'react';
import Checkbox from 'src/components/Checkbox';

// demo start
const { Size } = Checkbox;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        <Checkbox size={size}>checkbox</Checkbox>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
