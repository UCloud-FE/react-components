import React from 'react';

import Tag from 'src/components/Tag';
import Radio from 'src/components/Radio';
import Switch from 'src/components/Switch';
import Form from 'src/components/Form';
import Icon from 'src/components/Icon';

// demo start
const { StyleType } = Tag;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: 'default',
            icon: null
        };
    }
    render() {
        const { styleType, closable, icon, disabled } = this.state;
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
                    <Form.Item label="styleTyle" {...itemLayout}>
                        <Radio.Group
                            options={StyleType.map(styleType => ({ value: styleType }))}
                            value={styleType}
                            onChange={styleType => this.setState({ styleType })}
                        />
                    </Form.Item>
                    <Form.Item label="closable" {...itemLayout}>
                        <Switch checked={closable} onChange={closable => this.setState({ closable })} />
                    </Form.Item>
                    <Form.Item label="disabled" {...itemLayout}>
                        <Switch checked={disabled} onChange={disabled => this.setState({ disabled })} />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={['circle-fill', 'circle', 'loading', 'custom']
                                .map(v => ({ label: v, value: v }))
                                .concat([{ label: 'null', value: null }])}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Tag
                        {...this.state}
                        icon={icon === 'custom' ? <Icon type="loading" spin /> : icon}
                        onClose={() => console.log('close tag')}
                    >
                        Tag Content
                    </Tag>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
