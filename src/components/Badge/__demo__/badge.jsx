import React from 'react';

import demoUtil from 'tests/shared/demoUtil';
import Badge from 'src/components/Badge';
import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Input from 'src/components/Input';
import NumberInput from 'src/components/NumberInput';
import Switch from 'src/components/Switch';

// demo start
const { formLayout, DemoWrap } = demoUtil;
const { Placement, Color, defaultProps } = Badge;
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            dot: false,
            hideWhenZero: false,
            placement: defaultProps.placement,
            maxValue: defaultProps.maxValue,
            color: defaultProps.color,
            noneContent: false
        };
    }
    render() {
        const { value, dot, hideWhenZero, placement, maxValue, noneContent, color, cColor, cBackground } = this.state;
        return (
            <div>
                <Form className="demo-form" itemProps={{ ...formLayout }}>
                    <Form.Item label="value">
                        <Input value={value} onChange={e => this.setState({ value: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="maxValue">
                        <NumberInput value={maxValue} onNumberChange={maxValue => this.setState({ maxValue })} />
                    </Form.Item>
                    <Form.Item label="dot">
                        <Switch checked={dot} onChange={dot => this.setState({ dot })} />
                    </Form.Item>
                    <Form.Item label="hideWhenZero">
                        <Switch checked={hideWhenZero} onChange={hideWhenZero => this.setState({ hideWhenZero })} />
                    </Form.Item>
                    <Form.Item label="noneContent">
                        <Switch checked={noneContent} onChange={noneContent => this.setState({ noneContent })} />
                    </Form.Item>
                    <Form.Item label="placement">
                        <Radio.Group
                            options={Placement.map(p => ({ value: p }))}
                            value={placement}
                            onChange={placement => {
                                this.setState({ placement });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="color">
                        <Radio.Group
                            options={Color.map(p => ({ value: p }))}
                            value={color}
                            onChange={color => {
                                this.setState({ color });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="badgeStyle.color">
                        <input type="color" onChange={e => this.setState({ cColor: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="badgeStyle.background">
                        <input type="color" onChange={e => this.setState({ cBackground: e.target.value })} />
                    </Form.Item>
                </Form>
                <DemoWrap>
                    <Badge
                        value={value}
                        maxValue={+maxValue}
                        dot={dot}
                        hideWhenZero={hideWhenZero}
                        placement={placement}
                        color={color}
                        badgeStyle={{ color: cColor, background: cBackground }}
                    >
                        {noneContent ? null : <div style={{ width: 50, height: 50, background: '#ddd' }} />}
                    </Badge>
                </DemoWrap>
            </div>
        );
    }
}
// demo end

export default Demo;
