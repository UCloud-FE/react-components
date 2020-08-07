import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>common</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox checked>checked</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox indeterminate>indeterminate</Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
