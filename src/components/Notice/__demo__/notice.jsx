/* eslint-disable no-console */
import React from 'react';
import Notice from 'src/components/Notice';

import Form from 'src/components/Form';
import Radio from 'src/components/Radio';
import Icon from 'src/components/Icon';
import Switch from 'src/components/Switch';

// demo start
const { StyleType } = Notice;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styleType: StyleType[0],
            closable: false,
            icon: 'undefined',
            longContent: false,
            withAction: false
        };
    }
    render() {
        const { styleType, closable, icon, longContent, withAction } = this.state;
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const props = {
            styleType,
            closable,
            icon
        };
        if (icon === 'undefined') {
            delete props.icon;
        }
        if (withAction) {
            props.action = [
                <Icon key={1} style={{ cursor: 'pointer' }} type="eye" onClick={console.log} />,
                <Icon key={2} style={{ cursor: 'pointer', marginLeft: 8 }} type="more" onClick={console.log} />
            ];
        }
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
                    <Form.Item label="closable" {...itemLayout}>
                        <Switch checked={closable} onChange={closable => this.setState({ closable })} />
                    </Form.Item>
                    <Form.Item label="icon" {...itemLayout}>
                        <Radio.Group
                            options={['undefined', 'loading', 'circle'].map(icon => ({ value: icon }))}
                            value={icon}
                            onChange={icon => this.setState({ icon })}
                        />
                    </Form.Item>
                    <Form.Item label="longContent" {...itemLayout}>
                        <Switch checked={longContent} onChange={longContent => this.setState({ longContent })} />
                    </Form.Item>
                    <Form.Item label="withAction" {...itemLayout}>
                        <Switch checked={withAction} onChange={withAction => this.setState({ withAction })} />
                    </Form.Item>
                </Form>
                <div className="demo-wrap">
                    <Notice {...props}>
                        {longContent ? new Array(20).fill('This is a long notice;').join(' ') : 'This is a notice'}
                    </Notice>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
