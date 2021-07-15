import React from 'react';
import Compact from 'src/components/Compact';
import Select from 'src/components/Select';
import Input from 'src/components/Input';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Compact sharedProps={{ size: 'sm' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
        <div className="demo-wrap">
            <Compact sharedProps={{ className: 'test_cls' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Compact>
        </div>
    </div>
);
// demo end

export default Demo;
