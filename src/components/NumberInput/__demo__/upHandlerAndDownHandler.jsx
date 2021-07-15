import React from 'react';
import NumberInput from 'src/components/NumberInput';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput upHandler="+" downHandler="-" />
                </div>
                <div className="demo-wrap">
                    <NumberInput upHandler={<Icon type="arrow-up" />} downHandler={<Icon type="arrow-down" />} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
