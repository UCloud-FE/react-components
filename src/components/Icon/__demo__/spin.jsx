import React from 'react';
import Icon from 'src/components/Icon';

// demo start
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        <Icon type="link" spin {...layout} />
        <Icon type="check" spin {...layout} />
        <Icon type="circle-check" spin {...layout} />
        <Icon type="arrow-left" spin {...layout} />
        <Icon type="checkbox" spin {...layout} />
        <Icon type="loading" spin {...layout} />
    </div>
);
// demo end

export default Demo;
