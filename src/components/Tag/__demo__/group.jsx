import React from 'react';

import Tag from 'src/components/Tag';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: 'default',
            icon: null
        };
    }
    render() {
        const { compact } = this.state;
        const itemLayout = {
            labelCol: {
                span: 3
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="compact" {...itemLayout}>
                        <Switch checked={compact} onChange={compact => this.setState({ compact })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tag.Group {...this.state}>
                        <Tag.Icon icon="circle" />
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                    </Tag.Group>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
