import React from 'react';

import Input from 'src/components/Input';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input prefix="prefix" />
                </div>
                <div className="demo-wrap">
                    <Input prefix={<Icon type="search" />} />
                </div>
                <div className="demo-wrap">
                    <Input prefix="prefix" style={{ width: 300 }} />
                </div>
                <div className="demo-wrap">
                    <Input prefix={<div style={{ width: 50 }}>prefix</div>} style={{ width: 300 }} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
