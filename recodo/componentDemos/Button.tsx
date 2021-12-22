import React from 'react';
import { Button, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing="md">
                <Button styleType="primary">主要按钮</Button>
                <Button>次要按钮</Button>
                <Button disabled>禁用按钮</Button>
            </Box>
            <Box spacing="md">
                <Button styleType="primary" icon="plus">
                    带图标的主要按钮
                </Button>
                <Button icon="plus">带图标的次要按钮</Button>
                <Button icon="plus" disabled>
                    带图标的次要按钮
                </Button>
            </Box>
            <Box spacing="md">
                <Button styleType="primary" icon="plus" />
                <Button icon="plus" />
                <Button icon="plus" disabled />
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
