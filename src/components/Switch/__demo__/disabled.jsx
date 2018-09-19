import React from 'react';
import Switch from 'components/Switch';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Switch />
                </div>
                <div className="demo-wrap">
                    <Switch disabled />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
