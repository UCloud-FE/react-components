import React from 'react';

import AutoComplete from 'src/components/AutoComplete';

// demo start
const generateOptions = v => {
    const i = v.indexOf('@');
    return ['gmail.com', 'yahoo.com', 'outlook.com'].map(s => ({
        value: `${v.substring(0, i >= 0 ? i : undefined)}@${s}`
    }));
};

const Demo = () => {
    const [options, setOptions] = React.useState([]);
    const onChange = React.useCallback(async v => {
        if (v) {
            setOptions(generateOptions(v));
        } else {
            setOptions([]);
        }
    }, []);
    return (
        <>
            <AutoComplete options={options} onChange={onChange} />
        </>
    );
};
// demo end

export default Demo;
