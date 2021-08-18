import React from 'react';

import Checkbox from 'src/components/Checkbox';

// demo start
const options = [1, 2, 3].map(v => ({ value: v, label: v }));
const Demo = () => {
    return (
        <>
            <h2>容错测试</h2>
            <Checkbox.Group options={options} defaultValue={null} />
            <Checkbox.Group options={options} value={null} />
            <Checkbox.Group options={options} defaultValue="" />
            <Checkbox.Group options={options} defaultValue="xxx" />
            <Checkbox.Group options={options} defaultValue={function () {}} />
            <Checkbox.Group options={options} defaultValue={{ a: 1 }} />
            <Checkbox.Group options={123} defaultValue={{ a: 1 }} />
        </>
    );
};
// demo end

export default Demo;
