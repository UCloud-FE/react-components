// @ts-nocheck
import { Box, Form, Icon, Radio, Switch, Tag } from '@ucloud-fe/react-components';
import React from 'react';

const styleTypes = [
    'gray',
    'green',
    'yellow',
    'red',
    'primary',
    'purple',
    'lightblue',
    'blue',
    'orange',
    'cyan',
    'default',
    'success',
    'warning',
    'error',
    'purple-filled',
    'lightblue-filled',
    'blue-filled',
    'orange-filled',
    'yellow-filled',
    'cyan-filled',
    'red-filled'
];

// demo start
const { StyleType } = Tag;
class Demo1 extends React.Component {
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
const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Demo1 />
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag styleType={styleType} icon="circle-fill" closable style={{ width: '120px' }}>
                        标签文本
                    </Tag>
                ))}
            </Box>
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag.Icon styleType={styleType} icon="circle-fill" closable>
                        标签文本
                    </Tag.Icon>
                ))}
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
