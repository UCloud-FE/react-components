import React from 'react';

import demoUtil from 'shared/demoUtil';
import Select from 'src/components/Select';

// demo start
const { DemoWrap } = demoUtil;
const { Option } = Select;

const Demo = () => {
    return (
        <div>
            <h2>最大宽度</h2>
            <DemoWrap>
                <Select defaultValue={1}>
                    <Option value={1}>
                        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                    </Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                </Select>
            </DemoWrap>
        </div>
    );
};
// demo end

export default Demo;
