import React from 'react';
import { Notice, Box, NoticeStyleType } from '@ucloud-fe/react-components';

const styleTypes: NoticeStyleType[] = ['default', 'success', 'warning', 'error', 'disabled'];

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {styleTypes.map(styleType => (
                <Notice styleType={styleType} closable>
                    提示文本
                </Notice>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
