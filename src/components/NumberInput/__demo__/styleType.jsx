import React from 'react';
import NumberInput from 'components/NumberInput';

// demo start
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <NumberInput styleType={styleType} />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
