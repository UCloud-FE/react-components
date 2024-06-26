import React from 'react';

import List from 'src/components/List';

// demo start
const Demo = () => {
    const { Hovertip } = List;
    return <Hovertip popup="提示文本">鼠标移入悬停提示</Hovertip>;
};
// demo end

export default Demo;
