import React from 'react';
import Slider from 'src/components/Slider';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} disabled />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} range defaultValue={[3, 10]} disabled />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
