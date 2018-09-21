import React from 'react';
import Icon from 'components/Icon';

// demo start
const layout = {
    style: {
        marginRight: 10
    }
};
const Demo = () => (
    <div>
        <Icon type="link" {...layout} />
        <Icon type="check" {...layout} />
        <Icon type="circle-check" {...layout} />
        <Icon type="arrow-left" {...layout} />
        <Icon type="checkbox" {...layout} />
        <Icon type="loading" {...layout} />
    </div>
);
// demo end

export default Demo;
