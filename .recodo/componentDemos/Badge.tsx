// @ts-nocheck
import { Badge, BadgeProps, Box, Combine, Form, Input, NumberInput, Radio, Switch } from '@ucloud-fe/react-components';
import React from 'react';

// demo start

const formLayout = {
    labelCol: {
        span: 3
    },
    controllerCol: {
        span: 9
    }
};

const { Placement, Color, defaultProps } = Badge;
class BaseDemo extends React.PureComponent {
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
            </div>
        );
    }
}
// demo end

const square = <div style={{ width: 50, height: 50, background: '#ddd' }} />;

type Color = BadgeProps['color'];

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {[
                (color: Color) => (
                    <Badge value={100} color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Badge dot color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Badge value="文本" color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Combine style={{ display: 'inline-block' }}>
                        <Badge value="标记文本" color={color} />
                        描述
                    </Combine>
                ),
                (color: Color) => (
                    <Combine style={{ display: 'inline-block' }}>
                        <Badge dot color={color} />
                        状态
                    </Combine>
                )
            ].map(render => (
                <Box spacing={24}>{(['red', 'green', 'yellow', 'primary'] as Color[]).map(render)}</Box>
            ))}

            <BaseDemo />
        </Box>
    );
};

export default React.memo(Demo);
