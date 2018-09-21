import React from 'react';
import Switch from 'components/Switch';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Switch checked />
                </div>
                <div className="demo-wrap">
                    <Switch defaultChecked />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
