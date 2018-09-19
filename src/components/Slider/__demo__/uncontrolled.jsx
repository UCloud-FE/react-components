import React from 'react';
import Slider from 'components/Slider';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 10
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} defaultValue={5} />
                </div>
                <div className="demo-wrap">
                    <Slider min={0} max={20} value={this.state.value} onChange={v => this.setState({ value: v })} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
