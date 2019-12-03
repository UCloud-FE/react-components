import React from 'react';

import SvgIcon from 'src/components/SvgIcon';

// demo start
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        {['12px', '16px', '30px', '2em', '3rem'].map(size => (
            <SvgIcon key={size} size={size} type="cross" {...layout} />
        ))}
    </div>
);
// demo end

export default Demo;
