import React, { useCallback, useState } from 'react';
import { Modal,  Button } from '@ucloud-fe/react-components';

const Demo = () => {
    const [visible, setVisible] = useState(false);
    const toggleModal = useCallback(() => {
        setVisible(visible => !visible);
    }, []);
    return (
        <div>
            <Button onClick={toggleModal}>展示弹窗</Button>
            <Modal visible={visible} onClose={toggleModal} title='标题'>
                <Modal.Content>弹窗内容</Modal.Content>
            </Modal>
        </div>
    );
};

export default React.memo(Demo);
