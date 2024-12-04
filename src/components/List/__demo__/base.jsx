import React from 'react';

import List from 'src/components/List';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
        <>
            <br />
            <h2 style={{ color: '#000' }}>纯文本</h2>
            <br />
            <ConfigInfo
                dataSource={[
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    }
                ]}
                col={2}
            />
            <br />
            <h2 style={{ color: '#000' }}>纯文本(col大于dataSource的长度)</h2>
            <br />
            <ConfigInfo
                dataSource={[
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    }
                ]}
                col={3}
            />
            <br />
            <h2 style={{ color: '#000' }}>标题+内容（横向）</h2>
            <br />
            <ConfigInfo
                styleType="horizontal"
                dataSource={[
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        remark: '备注文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content:
                            '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        title: '标题文本标题文本标题文本标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    }
                ]}
                col={3}
            />
            <br />
            <h2 style={{ color: '#000' }}>标题+内容（纵向）</h2>
            <br />
            <ConfigInfo
                customTitleWidth={'100%'}
                dataSource={[
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
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
                    },
                    {
                        title: '标题文本标题文本标题建议不要太长',

                        titleTip: '提示文本',
                        content:
                            '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本',
                        extra: <ActionIcon popup="操作" />
                    }
                ]}
                col={1}
            />
        </>
    );
};
// demo end

export default Demo;
