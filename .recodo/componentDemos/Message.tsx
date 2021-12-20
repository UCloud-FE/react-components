import React from 'react';
import { Message, Box, MessageProps } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {(['default', 'success', 'loading', 'warning', 'error'] as MessageProps['styleType'][]).map(styleType => (
                <Message styleType={styleType} title="消息标题">
                    消息通知内容
                </Message>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
