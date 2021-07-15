import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput disabled />
                </div>
                <div className="demo-wrap">
                    <NumberInput />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
