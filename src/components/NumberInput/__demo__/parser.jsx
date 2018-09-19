import React from 'react';
import NumberInput from 'components/NumberInput';

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
