import React from 'react';
import Checkbox from 'components/Checkbox';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Checkbox>common</Checkbox>
                </div>
                <div className="demo-wrap">
                    <Checkbox disabled>disabled</Checkbox>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
