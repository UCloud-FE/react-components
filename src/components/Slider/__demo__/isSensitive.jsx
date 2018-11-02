import React from 'react';
import Slider from 'components/Slider';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} isSensitive onChange={console.log} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} onChange={console.log} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
