import React from 'react';

import ActionList from 'src/components/ActionList';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import NumberInput from 'src/components/NumberInput';
import Button from 'src/components/Button';

// demo start
const { Size } = ActionList;
const { StyleTypes } = Button;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'sm',
            smart: true,
            buttonStyleType: 'border',
            exposeCount: 3,
            actionListLength: 5
        };
    }
    render() {
        const { size, buttonStyleType, smart, exposeCount, actionListLength } = this.state;
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
                    <Form.Item label={'size'} {...itemLayout}>
                        <Radio.Group
                            options={Size.map(size => ({ value: size }))}
                            value={size}
                            onChange={size => this.setState({ size })}
                        />
                    </Form.Item>
                    <Form.Item label={'button styleType'} {...itemLayout}>
                        <Radio.Group
                            options={StyleTypes.map(styleType => ({ value: styleType }))}
                            value={buttonStyleType}
                            onChange={buttonStyleType => this.setState({ buttonStyleType })}
                        />
                    </Form.Item>
                    <Form.Item label="smart" {...itemLayout}>
                        <Switch checked={smart} onChange={smart => this.setState({ smart })} />
                    </Form.Item>
                    <Form.Item label="exposeCount" {...itemLayout}>
                        <NumberInput
                            value={exposeCount}
                            onNumberChange={exposeCount => this.setState({ exposeCount })}
                        />
                    </Form.Item>
                    <Form.Item label="actionListLength" {...itemLayout}>
                        <NumberInput
                            value={actionListLength}
                            onNumberChange={actionListLength => this.setState({ actionListLength })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <ActionList
                        actionList={new Array(actionListLength).fill(null).map((v, i) => ({
                            label: `Action ${i}`,
                            onClick: e => console.log('action', i, e)
                        }))}
                        {...{
                            size,
                            smart,
                            exposeCount,
                            buttonStyleType
                        }}
                    />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
