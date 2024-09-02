import React from 'react';

import List from 'src/components/List';
import Button from 'src/components/Button';
import Link from 'src/components/Link';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
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
                    content: '文本文本',
                    extra: (
                        <Link href="https://google.com" target="_blank">
                            Link to Google
                        </Link>
                    )
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
                    content: '文本文本',
                    extra: <Button size="sm">次按钮文本</Button>
                }
            ]}
            col={1}
        />
    );
};
// demo end

export default Demo;
