import React from 'react';
import NumberInput from 'components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput step={1.1} />
                </div>
                <div className="demo-wrap">
                    <NumberInput step={10} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
