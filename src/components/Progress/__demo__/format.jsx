import React from 'react';
import Progress from 'src/components/Progress';
import Input from 'src/components/Input';
import Form from 'src/components/Form';

// demo start
class Demo extends React.Component {
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
                    <Progress percent={percent} format={v => `${v.toFixed(2)}%`} />
                </div>
                <div className="demo-wrap" style={{ padding: 24 }}>
                    <Progress percent={percent} format={null} />
                </div>

                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} format={v => `${v.toFixed(2)}%`} styleType="circle" />
                </div>
                <div className="demo-wrap" style={{ padding: 24, width: 100 }}>
                    <Progress percent={percent} format={null} styleType="circle" />
                </div>
            </div>
        );
    }
}

// demo end

export default Demo;
