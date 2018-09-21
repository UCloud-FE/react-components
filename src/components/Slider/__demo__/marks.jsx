import React from 'react';
import Slider from 'components/Slider';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <Slider
                        min={0}
                        max={20}
                        defaultValue={3}
                        marks={{
                            5: '5个',
                            10: '10个',
                            18: '18个'
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
