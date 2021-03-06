import React from 'react';

import Box from 'src/components/Box';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Combine from 'src/components/Combine';

// demo start
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>类左右浮动布局</h2>
            <Box container justifyContent="space-between" alignItems="center">
                <Combine>
                    <span>文本内容</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
                <Combine>
                    <span>文本内容</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>单右对齐布局</h2>
            <Box container spacing="sm" justifyContent="flex-end" alignItems="center">
                <span>文本内容</span>
                <Button>按钮</Button>
                <Icon type="edit" />
            </Box>
        </div>
    </Box>
);
// demo end

export default Demo;
