import React from 'react';
import NumberInput from 'src/components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput parser={v => v.replace(/[^\d]+/g, '')} />
                </div>
                <div className="demo-wrap">
                    <NumberInput parser={v => v.replace(/[^\d/.]+/g, '')} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
