import React from 'react';
import Input from 'src/components/Input';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input defaultValue="default value" suffix={<Icon type="search" />} prefix="search" />
                </div>
                <div className="demo-wrap">
                    <Input disabled defaultValue="default value" suffix={<Icon type="search" />} prefix="search" />
                </div>
                <div className="demo-wrap">
                    <Input disabled defaultValue="default value" prefix={<Icon type="search" />} suffix="search" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
