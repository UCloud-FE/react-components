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
                        <NumberInput styleType={styleType} tooltip="自定义提示文案" />
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
