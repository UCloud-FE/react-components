import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox onChange={console.log} checked>
                        controlled
                    </Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox onChange={console.log} defaultChecked>
                        uncontrolled
                    </Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
