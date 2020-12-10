import React from 'react';

import Tag from 'src/components/Tag';
import Radio from 'src/components/Radio';
import Form from 'src/components/Form';
import Icon from 'src/components/Icon';

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
            icon: 'circle'
        };
    }
    render() {
        const { styleType, icon } = this.state;
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
