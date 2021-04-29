import React from 'react';
import moment from 'moment';

import Calendar from 'src/components/Calendar';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment()
        };
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Calendar value={this.state.value} onChange={v => this.setState({ value: v })} />
                </div>
                <div className="demo-wrap">
                    <Calendar defaultValue={moment()} />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
