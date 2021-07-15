import React from 'react';
import Slider from 'src/components/Slider';

// demo start
class Demo extends React.Component {
    renderRedTip(v) {
        return <p style={{ width: 50, color: 'red' }}>{v} 个</p>;
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} tipFormatter={null} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} tipFormatter={this.renderRedTip} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
