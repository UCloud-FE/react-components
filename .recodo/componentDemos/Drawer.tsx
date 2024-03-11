import { Box, Button, Drawer, Form, Radio } from '@ucloud-fe/react-components';
import React from 'react';

// @ts-ignore
const { Placement } = Drawer;
const Demo = () => {
    const itemLayout = {
        labelCol: { span: 3 },
        controllerCol: { span: 9 }
    };
    const [visible, setVisible] = React.useState(false);
    const [placement, setPlacement] = React.useState('right' as any);

    return (
        <Box container direction="column" spacing="lg">
            <Form className="demo-form">
                <Form.Item label="placement" {...itemLayout}>
                    <Radio.Group
                        value={placement}
                        onChange={placement => setPlacement(placement)}
                        options={Placement.map((placement: string) => ({
                            value: placement
                        }))}
                    />
                </Form.Item>
            </Form>
            <div className="demo-wrap">
                <Button onClick={() => setVisible(true)}>Toggle</Button>
                <Drawer
                    visible={visible}
                    {...(placement === 'left' || placement === 'right' ? { width: 200 } : { height: 200 })}
                    placement={placement}
                    onClose={() => setVisible(false)}
                >
                    content
                </Drawer>
            </div>
        </Box>
    );
};

export default React.memo(Demo);
