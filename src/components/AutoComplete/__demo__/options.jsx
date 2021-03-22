import React from 'react';

import AutoComplete from 'src/components/AutoComplete';
import Icon from 'src/components/Icon';

// demo start
const options = new Array(100).fill(null).map((v, i) => ({
    value: `Item ${i}`,
    label: (
        <span>
            <Icon type="circle" />
            This is the <i>Item</i>: {i}
        </span>
    )
}));
const Demo = () => {
    return (
        <>
            <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
// demo end

export default Demo;
