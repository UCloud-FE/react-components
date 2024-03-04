import React from 'react';

import Tag from 'src/components/Tag';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Icon from 'src/components/Icon';
import Switch from 'src/components/Switch';

// demo start
const { StyleType } = Tag;
let TrueIcon = Icon;
// Icon 在 context 中被文档强行覆盖，这里重新取一下
if (window.Icon) TrueIcon = window.Icon;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: 'default',
            icon: 'circle',
            iconSize: 'sm',
            border: true,
            borderType: 'default'
        };
    }
    render() {
        const { styleType, icon, border, borderType, iconSize } = this.state;
        const Icon = TrueIcon;
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
                    <Form.Item label="styleType" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={['circle-fill', 'circle', 'loading', 'custom'].map(v => ({ label: v, value: v }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="border" {...itemLayout}>
                        <Switch checked={border} onChange={border => this.setState({ border })} />
                    </Form.Item>
                    <Form.Item label="borderType" {...itemLayout}>
                        <Radio.Group
                            options={['default', 'circle'].map(borderType => ({ value: borderType }))}
                            value={borderType}
                            onChange={borderType => this.setState({ borderType })}
                        />
                    </Form.Item>
                    <Form.Item label="iconSize" {...itemLayout}>
                        <Radio.Group
                            options={['xs', 'sm', 'md', 'lg'].map(size => ({ value: size }))}
                            value={iconSize}
                            onChange={iconSize => this.setState({ iconSize })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tag.Icon {...this.state} icon={icon === 'custom' ? <Icon type="loading" spin /> : icon} />
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
