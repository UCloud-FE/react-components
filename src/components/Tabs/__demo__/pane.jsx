import React from 'react';
import Tabs from 'components/Tabs';
import Switch from 'components/Switch';
import Form from 'components/Form';

import _ from 'lodash';

// demo start
class PaneContent extends React.Component {
    componentDidMount() {
        console.log('Will log this when forceRender is true or on tab active');
    }

    render() {
        return <div {...this.props} />;
    }
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forceRender: false,
            disabled: false
        };
    }
    render() {
        const { forceRender, disabled } = this.state;
        const tabs = [];
        tabs.length = 10;
        tabs.fill(null);
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
                    <Form.Item label="forceRender" {...itemLayout}>
                        <Switch
                            checked={forceRender}
                            onChange={forceRender =>
                                this.setState({
                                    forceRender
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch
                            checked={disabled}
                            onChange={disabled =>
                                this.setState({
                                    disabled
                                })
                            }
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tabs style={{ height: 300 }}>
                        {_.map(tabs, (tab, index) => (
                            <Tabs.Pane
                                tab={`tab ${index}`}
                                key={index}
                                forceRender={forceRender}
                                disabled={disabled}
                                style={{ padding: 16 }}
                            >
                                <PaneContent>tab content {index}</PaneContent>
                            </Tabs.Pane>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
