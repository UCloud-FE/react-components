import React from 'react';
import Textarea from 'src/components/Textarea';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Textarea disabled />
                </div>
                <div className="demo-wrap">
                    <Textarea />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
