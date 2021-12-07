import React from 'react';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

// demo start
const Demo = () => {
    const [visible, setVisible] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setVisible(true)}>open</Button>
            <Modal
                visible={visible}
                onClose={() => setVisible(false)}
                okButtonProps={{ icon: 'arrow-left' }}
                cancelButtonProps={{ disabled: true }}
            >
                <Modal.Content maxHeight="500px">
                    <div style={{ height: '1000px', background: 'gray' }}>内容区域</div>
                </Modal.Content>
            </Modal>
        </div>
    );
};
// demo end

export default Demo;
