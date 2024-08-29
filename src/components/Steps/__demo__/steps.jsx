import React from 'react';

import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Steps from 'src/components/Steps';
import Switch from 'src/components/Switch';

// demo start
const itemLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};
const Status = Steps.Status;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            status: Steps.defaultProps.status,
            hasTitle: true,
            hasRemark: true,
            direction: 'horizontal',
            changeType: 'close',
            nowrap: false
        };
    }
    render() {
        const { current, status, hasTitle, hasRemark, direction, changeType, nowrap } = this.state;

        const steps = new Array(3).fill(null).map((v, i) => {
            const step = {};
            if (hasTitle) step.title = `第 ${i + 1} 步`;
            if (hasRemark) step.remark = '这是一条备注';

            if (i === 3) step.disabled = true;
            return step;
        });
        return (
            <div>
                <Form className="demo-form">
                    <Form.Item label="hasTitle" {...itemLayout}>
                        <Switch checked={hasTitle} onChange={hasTitle => this.setState({ hasTitle })} />
                    </Form.Item>
                    <Form.Item label="hasRemark" {...itemLayout}>
                        <Switch checked={hasRemark} onChange={hasRemark => this.setState({ hasRemark })} />
                    </Form.Item>
                    <Form.Item label="status" {...itemLayout}>
                        <Radio.Group
                            options={Status.map(status => ({ value: status }))}
                            value={status}
                            onChange={status => this.setState({ status })}
                        />
                    </Form.Item>
                    <Form.Item label="current" {...itemLayout}>
                        <Radio.Group
                            options={steps.map((step, i) => ({ value: i }))}
                            value={current}
                            onChange={current => this.setState({ current })}
                        />
                    </Form.Item>
                    <Form.Item label="direction" {...itemLayout}>
                        <Radio.Group
                            options={['horizontal', 'vertical'].map((direction, i) => ({ value: direction }))}
                            value={direction}
                            onChange={direction => this.setState({ direction })}
                        />
                    </Form.Item>
                    <Form.Item label="onChange" {...itemLayout}>
                        <Radio.Group
                            options={['open', 'close'].map((status, i) => ({ value: status }))}
                            value={changeType}
                            onChange={changeType => this.setState({ changeType })}
                        />
                    </Form.Item>
                    <Form.Item label="nowrap" {...itemLayout}>
                        <Switch checked={nowrap} onChange={nowrap => this.setState({ nowrap })} />
                    </Form.Item>
                </Form>

                <div className="demo-wrap">
                    <Steps
                        steps={steps}
                        current={current}
                        status={status}
                        direction={direction}
                        nowrap={nowrap}
                        onChange={
                            changeType === 'close'
                                ? null
                                : e => {
                                      this.setState({ current: e });
                                  }
                        }
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
