import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
const { Size, StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        return (
            <div>
                {Size.map(size => (
                    <div className="demo-wrap" key={size}>
                        {StyleType.map(styleType => (
                            <div className="demo-block" key={styleType}>
                                <NumberInput styleType={styleType} size={size} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
