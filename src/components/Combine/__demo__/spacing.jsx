import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

// demo start
const Demo = () => (
    <div>
        <div>
            <h3>spacing: smart</h3>
            <div className="demo-wrap">
                <Combine>
                    <Input />
                    <Button styleType="primary">按钮</Button>
                </Combine>
            </div>
        </div>
        {['sm', 'md', 'lg'].map(size => (
            <div key={size}>
                <h3>spacing: smart - {size}</h3>
                <div className="demo-wrap">
                    <Combine sharedProps={{ size }}>
                        <Input />
                        <Button styleType="primary">按钮</Button>
                    </Combine>
                </div>
            </div>
        ))}
        {['sm', 'md', 'lg'].map(size => (
            <div key={size}>
                <h3>spacing: {size}</h3>
                <div className="demo-wrap">
                    <Combine spacing={size}>
                        <Input />
                        <Button styleType="primary">按钮</Button>
                    </Combine>
                </div>
            </div>
        ))}
        <h3>spacing: compact</h3>
        <div className="demo-wrap">
            <Combine spacing="compact">
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
        <h3>spacing: custom</h3>
        <div className="demo-wrap">
            <Combine spacing="40px">
                <Input />
                <Button styleType="primary">按钮</Button>
            </Combine>
        </div>
    </div>
);
// demo end

export default Demo;
