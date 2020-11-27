import React from 'react';
import Badge from 'components/Badge';

import Form from 'components/Form';
import Radio from 'components/Radio';
import Input from 'components/Input';
import NumberInput from 'components/NumberInput';
import Switch from 'components/Switch';

// demo start
const { Placement } = Badge;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            dot: false,
            hideWhenZero: false,
            placement: Placement[0],
            maxValue: 99,
            noneContent: false
        };
    }
    render() {
        const { value, dot, hideWhenZero, placement, maxValue, noneContent, color, background } = this.state;
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
                    <Form.Item label="value" {...itemLayout}>
                        <Input value={value} onChange={e => this.setState({ value: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="maxValue" {...itemLayout}>
                        <NumberInput value={maxValue} onNumberChange={maxValue => this.setState({ maxValue })} />
                    </Form.Item>
                    <Form.Item label="dot" {...itemLayout}>
                        <Switch checked={dot} onChange={dot => this.setState({ dot })} />
                    </Form.Item>
                    <Form.Item label="hideWhenZero" {...itemLayout}>
                        <Switch checked={hideWhenZero} onChange={hideWhenZero => this.setState({ hideWhenZero })} />
                    </Form.Item>
                    <Form.Item label="noneContent" {...itemLayout}>
                        <Switch checked={noneContent} onChange={noneContent => this.setState({ noneContent })} />
                    </Form.Item>
                    <Form.Item label="placement" {...itemLayout}>
                        <Radio.Group
                            options={Placement.map(p => ({ value: p }))}
                            value={placement}
                            onChange={placement => {
                                this.setState({ placement });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="badgeStyle.color" {...itemLayout}>
                        <input type="color" onChange={e => this.setState({ color: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="badgeStyle.background" {...itemLayout}>
                        <input type="color" onChange={e => this.setState({ background: e.target.value })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Badge
                        value={value}
                        style={{ margin: 10 }}
                        maxValue={+maxValue}
                        dot={dot}
                        hideWhenZero={hideWhenZero}
                        placement={placement}
                        badgeStyle={{ color, background }}
                    >
                        {noneContent ? null : <div style={{ width: 50, height: 50, background: '#ddd' }} />}
                    </Badge>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
