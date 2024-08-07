import React from 'react';

import { List } from '@ucloud-fe/react-components';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
        <>
            <h2 style={{ color: '#000' }}>纯文本</h2>
            <br />
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
            <br />
            <h2 style={{ color: '#000' }}>带图片</h2>
            <br />
            <ConfigInfo
                noBorder
                dataSource={[
                    {
                        prefix: (
                            <div style={{ background: 'blue' }}>
                                <img
                                    alt="私有云/混合云"
                                    loading="lazy"
                                    width="36"
                                    height="36"
                                    src="https://www.ucloud.cn/_next/image?url=https%3A%2F%2Fwww-s.ucloud.cn%2F2024%2F03%2F9d6f0d19fccfdcbce77820b3cc4f9c5f_1710389144718.png&w=96&q=75"
                                ></img>
                            </div>
                        ),
                        title: '标题文本',
                        content: '内容文本',
                        extra: <ActionIcon popup="操作" />
                    },
                    {
                        prefix: (
                            <div style={{ background: 'blue' }}>
                                <img
                                    alt="私有云/混合云"
                                    loading="lazy"
                                    width="36"
                                    height="36"
                                    src="https://www.ucloud.cn/_next/image?url=https%3A%2F%2Fwww-s.ucloud.cn%2F2024%2F03%2F9d6f0d19fccfdcbce77820b3cc4f9c5f_1710389144718.png&w=96&q=75"
                                ></img>
                            </div>
                        ),
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '文本文本'
                    },
                    {
                        prefix: (
                            <div style={{ background: 'blue' }}>
                                <img
                                    alt="私有云/混合云"
                                    loading="lazy"
                                    width="36"
                                    height="36"
                                    src="https://www.ucloud.cn/_next/image?url=https%3A%2F%2Fwww-s.ucloud.cn%2F2024%2F03%2F9d6f0d19fccfdcbce77820b3cc4f9c5f_1710389144718.png&w=96&q=75"
                                ></img>
                            </div>
                        ),
                        title: '标题文本',
                        titleTip: '提示文本',
                        content: '文本文本'
                    }
                ]}
                col={1}
            />
        </>
    );
};
// demo end

export default Demo;
