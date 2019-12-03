import React from 'react';

import SvgIcon from 'src/components/SvgIcon';

// demo start
const layout = {
    style: {
        marginRight: 10
    }
};
const { Type } = SvgIcon;
const Demo = () => <div>{Type.map(type => <SvgIcon key={type} type={type} {...layout} />)}</div>;
// demo end

export default Demo;
