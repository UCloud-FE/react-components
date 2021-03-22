import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
const Demo = () => {
    return (
        <>
            <AutoComplete disabled options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
// demo end

export default Demo;
