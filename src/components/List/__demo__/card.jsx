import React from 'react';

import List from 'src/components/List';
import Card from 'src/components/Card';

// demo start
const Demo = () => {
    const { ConfigInfo, ActionIcon } = List;
    React.useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          [class^='uc-fe-card'] {
            .uc-fe-item-wrapper-last-line {
              border-bottom: 0;
            }
          }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []); // 传入空数组，使副作用只执行一次

    return (
        <>
            <h2 style={{ color: '#000' }}>在卡片中的 ConfigInfo </h2>
            <br />
            <Card>
                <Card.Content>
                    <ConfigInfo
                        dataSource={[
                            {
                                content: '内容文本',
                                extra: <ActionIcon disabled popup="操作" />
                            },
                            {
                                content: '内容文本',
                                extra: <ActionIcon disabled popup="操作" />
                            },
                            {
                                content: '内容文本',
                                extra: <ActionIcon disabled popup="操作" />
                            },
                            {
                                content: '内容文本',
                                extra: <ActionIcon disabled popup="操作" />
                            }
                        ]}
                        col={2}
                    />
                </Card.Content>
            </Card>
        </>
    );
};
// demo end

export default Demo;
