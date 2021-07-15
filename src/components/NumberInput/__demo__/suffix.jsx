import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
const { StyleType } = NumberInput;
class Demo extends React.Component {
    render() {
        const max = 10;
        return (
            <div>
                {StyleType.map(styleType => (
                    <div className="demo-wrap" key={styleType}>
                        <div className="demo-block">
                            <NumberInput suffix="G" styleType={styleType} />
                        </div>
                        <div className="demo-block">
                            <NumberInput suffix="台" styleType={styleType} />
                        </div>
                        <div className="demo-block">
                            <NumberInput max={max} suffix={`/${max}`} styleType={styleType} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
// demo end

export default Demo;
