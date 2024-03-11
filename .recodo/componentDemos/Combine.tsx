import { Box, Combine, Form, Icon, Input, Radio, Select, Switch } from '@ucloud-fe/react-components';
import React from 'react';

const Sizes = ['sm', 'md', 'lg'];
const Demo = () => {
    const itemLayout = {
        labelCol: { span: 3 },
        controllerCol: { span: 9 }
    };
    const [size, setSize] = React.useState('md');
    const [disabled, setDisabled] = React.useState(false);
    const [spacing, setSpacing] = React.useState('smart');
    const [separator, setSeparator] = React.useState('default');

    const props = React.useMemo(() => {
        const _props = {} as any;
        switch (separator) {
            case '-':
                _props.separator = '-';
                break;
            case 'icon':
                _props.separator = <Icon type="arrow-right" />;
                break;
        }
        return _props;
    }, [separator]);
    return (
        <Box container direction="column" spacing="lg">
            <Form className="demo-form">
                <Form.Item label="size" {...itemLayout}>
                    <Radio.Group
                        value={size}
                        onChange={size => setSize(size)}
                        options={Sizes.map(size => ({
                            value: size
                        }))}
                    />
                </Form.Item>
                <Form.Item label="disabled" {...itemLayout}>
                    <Switch checked={disabled} onChange={(disabled: boolean) => setDisabled(disabled)} />
                </Form.Item>
                <Form.Item label="spacing" {...itemLayout}>
                    <Radio.Group
                        value={spacing}
                        onChange={spacing => setSpacing(spacing)}
                        options={['smart', 'compact', 'sm', 'md', 'lg'].map(spacing => ({
                            value: spacing
                        }))}
                    />
                </Form.Item>
                <Form.Item label="separator" {...itemLayout}>
                    <Radio.Group
                        value={separator}
                        onChange={separator => setSeparator(separator)}
                        options={['default', '-', 'icon'].map(separator => ({
                            value: separator
                        }))}
                    />
                </Form.Item>
            </Form>
            <div className="demo-wrap">
                <Combine sharedProps={{ size, disabled }} spacing={spacing} {...props}>
                    <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                    <Input />
                </Combine>
            </div>
        </Box>
    );
};

export default React.memo(Demo);
