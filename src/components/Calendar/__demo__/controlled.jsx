import React from 'react';
import Calendar from 'components/Calendar';
import moment from 'moment';

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
                    <Calendar
                        value={this.state.value}
                        onSelect={v => this.setState(v)}
                        onChange={v => console.log('change', v)}
                    />
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
