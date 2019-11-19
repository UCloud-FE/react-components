import React from 'react';

import Breadcrumb from 'src/components/Breadcrumb';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
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
        this.state = {
            separator: Breadcrumb.defaultProps.separator
        };
    }
    render() {
        const { separator } = this.state;
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="separator" {...itemLayout}>
                        <Input value={separator} onChange={e => this.setState({ separator: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Breadcrumb separator={separator}>
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
