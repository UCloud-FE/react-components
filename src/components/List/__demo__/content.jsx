import React from 'react';

import List from 'src/components/List';

// demo start
const Demo = () => {
    const { Content } = List;
    return (
        <>
            <h2 style={{ color: '#000' }}>Content</h2>
            <br />
            <Content styleType={'secondary'}>测试内容</Content>
            <Content>测试内容</Content>
        </>
    );
};
// demo end

export default Demo;
