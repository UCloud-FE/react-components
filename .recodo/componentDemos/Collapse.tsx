import { Collapse } from '@ucloud-fe/react-components';
import React from 'react';

const Demo = () => {
    const [openKeys, setOpenKeys] = React.useState<string[]>(['0']);
    return (
        <Collapse onChange={(v: string[]) => setOpenKeys(v)} openKeys={openKeys}>
            <Collapse.Panel title={`panel0`} panelKey={'0'}>
                content0
            </Collapse.Panel>
            <Collapse.Panel title={`panel1`} panelKey={'1'}>
                content1
            </Collapse.Panel>
        </Collapse>
    );
};

export default React.memo(Demo);
