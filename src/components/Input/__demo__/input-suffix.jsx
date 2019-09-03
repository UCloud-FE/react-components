import React from 'react';

import Input from 'src/components/Input';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Input suffix="suffix" />
                </div>
                <div className="demo-wrap">
                    <Input suffix={<Icon type="search" />} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
