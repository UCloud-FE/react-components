import React from 'react';
import { Badge, BadgeProps, Box, Combine } from '@ucloud-fe/react-components';

const square = <div style={{ width: 50, height: 50, background: '#ddd' }} />;

type Color = BadgeProps['color'];

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {[
                (color: Color) => (
                    <Badge value={100} color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Badge dot color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Badge value="文本" color={color}>
                        {square}
                    </Badge>
                ),
                (color: Color) => (
                    <Combine style={{ display: 'inline-block' }}>
                        <Badge value="标记文本" color={color} />
                        描述
                    </Combine>
                ),
                (color: Color) => (
                    <Combine style={{ display: 'inline-block' }}>
                        <Badge dot color={color} />
                        状态
                    </Combine>
                )
            ].map(render => (
                <Box spacing={24}>{(['red', 'green', 'yellow', 'primary'] as Color[]).map(render)}</Box>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
