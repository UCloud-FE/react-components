import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));
let i = 0;
const Demo = () => {
    const [v, setV] = React.useState('controlled');
    const onChange = React.useCallback(
        v => {
            if (i++ % 2) setV(v);
        },
        [setV]
    );
    return (
        <>
            <h2>Controlled</h2>
            <AutoComplete options={options} value={v} onChange={onChange} />
            <h2>Uncontrolled</h2>
            <AutoComplete options={options} onChange={console.log} defaultValue={'Item'} />
        </>
    );
};
// demo end

export default Demo;
