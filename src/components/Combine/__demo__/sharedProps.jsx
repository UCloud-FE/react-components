import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Input from 'src/components/Input';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine sharedProps={{ size: 'sm' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
        <div className="demo-wrap">
            <Combine sharedProps={{ className: 'test_cls' }}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Input />
            </Combine>
        </div>
    </div>
);
// demo end

export default Demo;
