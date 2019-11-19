import React from 'react';

import Breadcrumb from 'src/components/Breadcrumb';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Icon from 'src/components/Icon';

// demo start
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { current, noAction } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="current" {...itemLayout}>
                        <Switch value={current} onChange={v => this.setState({ current: v })} />
                    </Form.Item>
                    <Form.Item label="noAction" {...itemLayout}>
                        <Switch value={noAction} onChange={v => this.setState({ noAction: v })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Breadcrumb>
                        <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                        <Breadcrumb.Item>
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="uhost" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()} {...this.state}>
                            custom
                        </Breadcrumb.Item>
                        <Breadcrumb.Item current>current</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
