import React from 'react';

import Breadcrumb from 'src/components/Breadcrumb';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Breadcrumb>
                        <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                        <Breadcrumb.Item noAction>
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>
                            <Icon type="uhost" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="https://www.google.com" target="_blank">
                            google
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                        <Breadcrumb.Item current>current</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
