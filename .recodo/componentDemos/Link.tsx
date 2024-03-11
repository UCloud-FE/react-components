// @ts-nocheck
import React from 'react';

import { Form, Input, Link, Radio } from '@ucloud-fe/react-components';
const Sizes = ['sm', 'md', 'lg'];
const StyleType = ['primary', 'border', 'border-gray'];
const Shape = ['null', 'circle', 'square'];
// demo start
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: Sizes[0],
            styleType: StyleType[0],
            shape: Shape[0],
            icon: 'plus'
        };
    }
    render() {
        const { size, styleType, shape, icon } = this.state;
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
                    <Form.Group title="普通使用">
                        <Link href="https://google.com" target="_blank">
                            Link to Google
                        </Link>
                    </Form.Group>
                    <Form.Group title="Button">
                        <Form.Item label="size" {...itemLayout}>
                            <Radio.Group
                                options={Sizes.map(v => ({ value: v, lable: v }))}
                                onChange={size => this.setState({ size })}
                                value={size}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item label="styleType" {...itemLayout}>
                            <Radio.Group
                                options={StyleType.map(v => ({ value: v, lable: v }))}
                                onChange={styleType => this.setState({ styleType })}
                                value={styleType}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item label="shape" {...itemLayout}>
                            <Radio.Group
                                options={Shape.map(v => ({ value: v, lable: v }))}
                                onChange={shape => this.setState({ shape })}
                                value={shape}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item label="icon" {...itemLayout}>
                            <Input
                                value={icon}
                                onChange={e => this.setState({ icon: e.target.value })}
                                placeholder="icon"
                            />
                        </Form.Item>
                    </Form.Group>
                </Form>
                <div className="demo-wrap">
                    <Link.Button
                        styleType={styleType}
                        size={size}
                        shape={shape === 'null' ? undefined : shape}
                        href="https://google.com"
                        target="_blank"
                        icon={icon}
                    >
                        Link
                    </Link.Button>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
