import React from 'react';

import Box from 'src/components/Box';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Select from 'src/components/Select';
import Icon from 'src/components/Icon';
import Combine from 'src/components/Combine';

// demo start
const Demo = () => (
    <Box>
        <h2>工具栏</h2>
        <div className="demo-wrap">
            <Box container justifyContent="space-between" alignItems="center">
                <Combine>
                    <span>这是一条工具栏</span>
                    <Button>按钮</Button>
                    <Icon type="edit" />
                </Combine>
                <Combine>
                    <Select options={[1, 2, 3].map(v => ({ value: v, label: `option ${v}` }))} />
                    <Input.Search />
                    <Button>按钮</Button>
                </Combine>
            </Box>
        </div>
        <h2>简易自适应布局</h2>
        <div className="demo-wrap">
            <Box container direction="column" style={{ height: 300 }}>
                <div style={{ height: 20, background: 'black' }}></div>
                <Box container flex="1 1 auto" style={{ height: '100%' }}>
                    <div style={{ background: '#999', width: 100, height: '100%' }}></div>
                    <Box flex="1 1 auto"></Box>
                </Box>
            </Box>
        </div>
        <h2>高度差对齐布局</h2>
        <div className="demo-wrap">
            <Box container spacing={['md', 'md']} wrap="wrap">
                {new Array(10).fill(null).map((v, i) => (
                    <Box key={i} span={6}>
                        <div style={{ background: 'gray', height: 100 + i * 10 + 'px' }}></div>
                    </Box>
                ))}
            </Box>
        </div>
    </Box>
);
// demo end

export default Demo;
