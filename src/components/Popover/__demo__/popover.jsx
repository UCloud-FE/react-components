import React from 'react';

import Popover from 'src/components/Popover';
import Checkbox from 'src/components/Checkbox';
import Input from 'src/components/Input';
import demoUtil from 'shared/demoUtil';
import Form from 'src/components/Form';
import Switch from 'src/components/Switch';

// demo start
const { formLayout, DemoWrap } = demoUtil;
const Popup = () => <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>;

const Demo = () => {
    const [trigger, setTrigger] = React.useState(['hover']);
    const [visible, setVisible] = React.useState(false);
    const [forceAlignWhenScroll, setForceAlignWhenScroll] = React.useState(true);

    const props = {
        trigger,
        visible,
        forceAlignWhenScroll
    };
    return (
        <div>
            <Form className="demo-form" itemProps={{ ...formLayout }}>
                <Form.Item label="trigger">
                    <Checkbox.Group
                        options={['hover', 'focus', 'click', 'contextMenu'].map(tri => ({
                            value: tri,
                            label: tri
                        }))}
                        onChange={setTrigger}
                        value={trigger}
                    />
                </Form.Item>
                <Form.Item label="visible">
                    <Switch checked={visible} onChange={setVisible} />
                </Form.Item>
                <Form.Item label="forceAlignWhenScroll">
                    <Switch checked={forceAlignWhenScroll} onChange={setForceAlignWhenScroll} />
                </Form.Item>
            </Form>
            <DemoWrap>
                <Popover {...props} popup={<Popup />} onVisibleChange={setVisible}>
                    <Input placeholder="trigger input" />
                </Popover>
            </DemoWrap>
        </div>
    );
};
// demo end

export default Demo;
