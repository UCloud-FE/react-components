import React from 'react';
import Calendar from 'components/Calendar';
import moment from 'moment';

// demo start
class Demo extends React.Component {
    custom(current, value) {
        const range = [moment(current).subtract(7, 'd'), moment(current).add(7, 'd')];
        return !moment(value).isBetween(...range);
    }

    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Calendar
                        rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
                    />
                </div>
                <div className="demo-wrap">
                    <Calendar rules={{ range: [moment().subtract(7, 'd'), moment().add(7, 'd')] }} />
                </div>
                <div className="demo-wrap">
                    <Calendar rules={{ custom: this.custom }} />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
