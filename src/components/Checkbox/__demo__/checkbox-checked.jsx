import React from 'react';
import Checkbox from 'src/components/Checkbox';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>unchecked</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox checked>checked</Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
