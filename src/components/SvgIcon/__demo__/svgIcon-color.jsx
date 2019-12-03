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
        {['black', 'white', 'red', 'green', 'blue', 'purple', '#18E1c9'].map(color => (
            <SvgIcon key={color} color={color} type="cross" {...layout} />
        ))}
    </div>
);
// demo end

export default Demo;
