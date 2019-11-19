import React from 'react';

import Breadcrumb from 'src/components/Breadcrumb';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="demo-wrap">
                    <Breadcrumb>
                        <Breadcrumb.Item current>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
