import React from 'react';
import Slider from 'components/Slider';

// demo start
class Demo extends React.Component {
    renderRedTip(option) {
        const { currentValue, inputValue } = option;
        return (
            <p style={{ width: 'auto', whiteSpace: 'pre-line', color: 'red' }}>
                当前:{currentValue}, 输入: {inputValue}
                {'\n'}回车或失焦生效
            </p>
        );
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} numberInputTipFormatter={null} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={10} numberInputTipFormatter={this.renderRedTip} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
