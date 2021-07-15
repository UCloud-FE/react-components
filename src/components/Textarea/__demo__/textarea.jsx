import React from 'react';
import Textarea from 'src/components/Textarea';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { disabled } = this.state;
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
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Textarea disabled={disabled} placeholder="please input here" />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
