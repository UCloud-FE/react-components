import React from 'react';
import Radio from 'src/components/Radio';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Radio onChange={console.log} checked>
                        controlled
                    </Radio>
                </div>
                <div className="demo-wrap">
                    <Radio onChange={console.log} defaultChecked>
                        uncontrolled
                    </Radio>
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
