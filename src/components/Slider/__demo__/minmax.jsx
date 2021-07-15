import React from 'react';
import Slider from 'src/components/Slider';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={10} max={20} defaultValue={15} />
                </div>
                <div className="demo-wrap">
                    <Slider max={20} defaultValue={10} />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={10} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
