import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
const { StyleType } = Checkbox;
const options = [1, 2, 3];
class Demo extends React.Component {
    render() {
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <Checkbox.Group styleType={styleType} options={options.map(v => ({ value: v }))} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
