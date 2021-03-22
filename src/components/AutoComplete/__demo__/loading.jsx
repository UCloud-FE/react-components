import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const generateOptions = v => {
    return new Array(10).fill(null).map((_v, i) => ({ value: `${v}-${v} ${i}` }));
};
const wait = t => new Promise(resolve => setTimeout(resolve, t));
let i = 0;
const Demo = () => {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(async v => {
        if (v) {
            const ri = ++i;
            setLoading(true);
            await wait(Math.random() * 2000);
            if (ri === i) {
                setOptions(generateOptions(v));
                setLoading(false);
            }
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} handleSearch={false} optionsLoading={loading} />
        </>
    );
};
// demo end

export default Demo;
