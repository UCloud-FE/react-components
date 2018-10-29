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
                <div className="demo-wrap">
                    <Slider
                        min={10}
                        max={1000}
                        defaultValue={12}
                        marks={{
                            50: {
                                label: '50',
                                step: 2,
                                ratio: 10
                            },
                            100: {
                                label: '100',
                                step: 5,
                                ratio: 10
                            },
                            200: {
                                label: '200',
                                step: 10,
                                ratio: 15
                            },
                            400: {
                                label: '400',
                                step: 20
                            },
                            1000: {
                                label: '1000',
                                step: 50
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
