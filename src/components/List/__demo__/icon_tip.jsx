import React from 'react';

import List from 'src/components/List';
import SvgIcon from 'src/components/SvgIcon';

// demo start
const Demo = () => {
    const { Icontip } = List;
    return (
        <>
            <Icontip popup="提示文本" />
            <Icontip popup="提示文本" icon={<SvgIcon type="cog" />} />
        </>
    );
};
// demo end

export default Demo;
