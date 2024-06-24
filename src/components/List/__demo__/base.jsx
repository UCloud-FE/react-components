import React from 'react';

import List from 'src/components/List';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
        <>
            <h3>纯文本</h3>
            <ConfigInfo
                dataSource={[
                    {
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    }
                ]}
                col={1}
            />
            <h3>标题+内容（横向）</h3>
            <ConfigInfo
                styleType="horizontal"
                dataSource={[
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        remark: '备注文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content:
                            '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本标题文本标题文本标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    }
                ]}
                col={1}
            />
            <h3>标题+内容（纵向）</h3>
            <ConfigInfo
                customTitleWidth={'100%'}
                dataSource={[
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '内容文本',
                        extra: <ActionIcon disabled popup="操作" />
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
                        extra: <ActionIcon disabled popup="操作" />
                    },
                    {
                        title: '标题文本标题文本标题建议不要太长',

                        titleTip: '提示文本',
                        content:
                            '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本',
                        extra: <ActionIcon disabled popup="操作" />
                    }
                ]}
                col={1}
            />
        </>
    );
};
// demo end

export default Demo;
