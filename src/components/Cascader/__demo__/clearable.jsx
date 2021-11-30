import React from 'react';

import Cascader from 'src/components/Cascader';
import demoUtil from 'shared/demoUtil';

// demo start

const _dataSource = [
    {
        title: 'parent title',
        key: 'first',
        children: [
            {
                title: 'children title',
                key: 'second'
            }
        ]
    }
];

const { DemoWrap } = demoUtil;
const Demo = () => {
    return (
        <div>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} clearable />
            </DemoWrap>
            <DemoWrap>
                <Cascader dataSource={_dataSource} defaultValue={['first', 'second']} />
            </DemoWrap>
        </div>
    );
};
// demo end

export default Demo;
