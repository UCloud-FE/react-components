import React from 'react';
import Button from 'src/components/Button';
import Link from 'src/components/Link';
import List from 'src/components/List';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    return (
        <ConfigInfo
            styleType="horizontal"
            dataSource={[
                { title: '标题文本标题文本标题文本标题文本', content: '内容文本', extra: <ActionIcon popup="操作" /> },
                {
                    title: '标题文本标题文本标题文本标题文本',
                    titleTip: '提示文本',
                    content: '内容文本',
                    extra: <Button size="sm">次按钮文本</Button>
                },
                {
                    title: '标题文本',
                    content: '内容文本',
                    extra: (
                        <Link href="https://google.com" target="_blank">
                            Link to Google
                        </Link>
                    ),
                    remark: '备注文本'
                },
                {
                    title: '标题文本',
                    titleTip: '提示文本',
                    content: '内容文本',
                    extra: <ActionIcon disabled popup="操作" />
                }
            ]}
            col={1}
        />
    );
};
// demo end

export default Demo;
