import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={9} max={10} />
                </div>
                <div className="demo-wrap">
                    <NumberInput defaultValue={11} min={10} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
