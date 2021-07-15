import React from 'react';
import Switch from 'src/components/Switch';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Switch />
                </div>
                <div className="demo-wrap">
                    <Switch onText="开" offText="关" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
