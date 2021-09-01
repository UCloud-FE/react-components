import React from 'react';

import ConfigProvider from 'src/components/ConfigProvider';
import Icon from 'src/components/Icon';

// demo start
const Demo = () => (
    <div>
        <ConfigProvider iconDefaultPrefix="xxx_">
            <Icon type="test" />
        </ConfigProvider>
    </div>
);
// demo end

export default Demo;
