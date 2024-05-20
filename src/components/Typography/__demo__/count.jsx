import React from 'react';

import Typography from 'src/components/Typography';
// demo start
const { Count, Text } = Typography;
const Demo = () => {
    return (
        <div>
            <Text size="t1" lineHeight="sm">
                使用率
            </Text>
            <br />
            <Count size="xxlg" color="dark">
                80%
            </Count>
            <br />
        </div>
    );
};
// demo end

export default Demo;
