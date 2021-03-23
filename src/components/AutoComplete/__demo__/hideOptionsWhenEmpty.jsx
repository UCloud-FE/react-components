import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const _options = new Array(100).fill(null).map((v, i) => ({ value: `Item ${i}` }));

const Demo = () => {
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(v => {
        if (v) {
            setOptions(_options);
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} defaultValue={'Item'} />
        </>
    );
};
// demo end

export default Demo;
