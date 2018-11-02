import React from 'react';
import Slider from 'components/Slider';
import Icon from 'components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider
                        defaultValue={5}
                        numberInput={{
                            upHandler: <Icon type="arrow-up" />,
                            downHandler: <Icon type="arrow-down" />
                        }}
                    />
                </div>
                <div className="demo-wrap">
                    <Slider defaultValue={5} numberInput={null} />
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
