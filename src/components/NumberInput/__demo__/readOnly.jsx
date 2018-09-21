import React from 'react';
import NumberInput from 'components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput readOnly />
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
