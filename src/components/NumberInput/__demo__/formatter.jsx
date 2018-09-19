import React from 'react';
import NumberInput from 'components/NumberInput';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <NumberInput formatter={v => `${v} 台`} defaultValue={3} />
                </div>
                <div className="demo-wrap">
                    <NumberInput formatter={v => `买了 ${v} 个苹果`} defaultValue={2} inputStyle={{ width: 100 }} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
