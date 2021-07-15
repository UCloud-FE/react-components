import React from 'react';

import demoUtil from 'shared/demoUtil';
import TimePicker from 'src/components/TimePicker';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';
import Radio from 'src/components/Radio';
import Input from 'src/components/Input';

// demo start
const { formLayout, DemoWrap } = demoUtil;
const Demo = () => {
    const [nullable, setNullable] = React.useState(false);
    const [format, setFormat] = React.useState('HH:mm:ss');
    const [size, setSize] = React.useState('md');
    const [disabled, setDisabled] = React.useState(false);
    const handleFormatChange = React.useCallback(e => setFormat(e.target.value), []);
    const handleChange = React.useCallback(v => {
        console.log(v ? v.format('HH:mm:ss') : '' + v, v);
    }, []);
    const props = {
        onChange: handleChange,
        format,
        disabled,
        size,
        nullable
    };
    return (
        <>
            <Form className="demo-form" itemProps={{ ...formLayout }}>
                <Form.Item label="nullable">
                    <Switch checked={nullable} onChange={setNullable} />
                </Form.Item>
                <Form.Item label="format">
                    <Input value={format} onChange={handleFormatChange} />
                </Form.Item>
                <Form.Item label="disabled">
                    <Switch checked={disabled} onChange={setDisabled} />
                </Form.Item>
                <Form.Item label="size">
                    <Radio.Group
                        value={size}
                        options={['sm', 'md', 'lg'].map(value => ({ value }))}
                        onChange={setSize}
                    />
                </Form.Item>
            </Form>
            <DemoWrap>
                <TimePicker {...props} onChange={handleChange} />
            </DemoWrap>
        </>
    );
};
// demo end

export default Demo;
