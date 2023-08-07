import React from 'react';
import Slider from 'src/components/Slider';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={10} max={20} range defaultValue={[10, 12]} />
                </div>
                <div className="demo-wrap">
                    <Slider max={20} defaultValue={[2, 10]} range />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={[20, 50]} range />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
