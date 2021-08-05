import React from 'react';

import Checkbox from 'src/components/Checkbox';

// demo start
const options = new Array(1000).fill(null).map((v, i) => ({ value: i, label: `option-${i}` }));
const Demo = () => {
    return (
        <div className="demo-wrap">
            <Checkbox.Group options={options} onChange={console.log} />
        </div>
    );
};
// demo end

export default Demo;
