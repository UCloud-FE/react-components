import { Box, Link, Message, MessageProps } from '@ucloud-fe/react-components';
import React from 'react';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {(['default', 'success', 'loading', 'warning', 'error'] as MessageProps['styleType'][]).map(styleType => (
                <Message styleType={styleType} title="消息标题">
                    消息通知内容
                </Message>
            ))}
            <Message title="消息标题" />
            <Message
                title="Message Title"
                footer={
                    <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: 14 }}>
                        <Link href="#" target="_blank" style={{ marginRight: 8, textDecoration: 'none' }}>
                            点击操作
                        </Link>
                        <Link href="#" target="_blank" style={{ textDecoration: 'none' }}>
                            点击操作
                        </Link>
                    </div>
                }
            >
                this is a message
            </Message>
        </Box>
    );
};

export default React.memo(Demo);
