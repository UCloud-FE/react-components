// @ts-nocheck
import { Box, Form, Input, Progress } from '@ucloud-fe/react-components';
import React from 'react';

// demo start
class BaseDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 10
        };
    }
    render() {
        const { percent } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 9
            }
        };
        return (
            <div>
                <Form>
                    <Form.Item label={'percent'} {...itemLayout}>
                        <Input.Number
                            value={percent}
                            min={0}
                            max={100}
                            onNumberChange={percent => this.setState({ percent })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} />
                </div>
                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} styleType="circle" />
                </div>
            </div>
        );
    }
}

// demo end

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <BaseDemo />
            <Progress percent={40} />
            <Progress percent={50} color="error" />
            <Progress percent={100} color="success" />
            <Progress percent={20} color="warn" />
        </Box>
    );
};

export default React.memo(Demo);
