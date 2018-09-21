import React from 'react';
import Input from 'components/Input';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input disabled icon="circle" />
                </div>
                <div className="demo-wrap">
                    <Input icon="circle" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
