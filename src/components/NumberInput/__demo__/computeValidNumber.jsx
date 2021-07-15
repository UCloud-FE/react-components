import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <NumberInput defaultValue={2} step={2} computeValidNumber={v => ((v / 2) | 0) * 2} />
            </div>
        );
    }
}
// demo end

export default Demo;
