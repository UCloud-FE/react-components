import React from 'react';

import Combine from 'src/components/Combine';
import Select from 'src/components/Select';
import Icon from 'src/components/Icon';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine separator="-">
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
            </Combine>
        </div>
        <div className="demo-wrap">
            <Combine separator={<Icon type="arrow-right" />}>
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
                <Select options={[1, 2, 3].map(i => ({ value: i }))} />
            </Combine>
        </div>
    </div>
);
// demo end

export default Demo;
