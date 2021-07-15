import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={2} precision={2} />
                </div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={2} precision={4} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
