// @ts-nocheck
import React from 'react';

import { Button, Form, Loading, Switch } from '@ucloud-fe/react-components';

// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { loading, showTip } = this.state;
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
                    <Form.Item label="loading" {...itemLayout}>
                        <Switch checked={loading} onChange={loading => this.setState({ loading })} />
                    </Form.Item>
                    <Form.Item label="showTip" {...itemLayout}>
                        <Switch checked={showTip} onChange={showTip => this.setState({ showTip })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Loading loading={loading} tip={showTip && 'Loading...'}>
                        <div style={{ height: 100, background: 'gray' }}>
                            <Button
                                styleType="primary"
                                style={{
                                    display: 'block',
                                    width: 200,
                                    margin: '0 auto',
                                    top: 20,
                                    position: 'relative'
                                }}
                                onClick={() =>
                                    this.setState({
                                        loading: true
                                    })
                                }
                            >
                                Start To Loading
                            </Button>
                        </div>
                    </Loading>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
