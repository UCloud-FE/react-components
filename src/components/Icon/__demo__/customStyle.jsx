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
        <Icon type="link" {...layout} style={{ color: 'red', fontSize: '20px' }} className="test_cls" />
    </div>
);
// demo end

export default Demo;
