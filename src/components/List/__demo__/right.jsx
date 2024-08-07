import React from 'react';

import List from 'src/components/List';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
        <ConfigInfo
            styleType="horizontal"
            aligin="right"
            dataSource={[
                { title: '标题文本', content: '内容文本', extra: <ActionIcon popup="操作" /> },
                {
                    title: '标题文本',
                    titleTip: '提示文本',
                    content: (
                        <>
                            <p style={{ margin: 0 }}>文本文本</p>
                            <p style={{ margin: 0 }}>文本文本</p>
                        </>
                    ),
                    extra: <ActionIcon popup="操作" />
                }
            ]}
            col={1}
        />
    );
};
// demo end

export default Demo;
