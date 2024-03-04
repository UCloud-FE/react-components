import React from 'react';
import { Tag, Box } from '@ucloud-fe/react-components';

const styleTypes = [
    'gray',
    'green',
    'yellow',
    'red',
    'primary',
    'purple',
    'lightblue',
    'blue',
    'orange',
    'cyan',
    'default',
    'success',
    'warning',
    'error',
    'purple-filled',
    'lightblue-filled',
    'blue-filled',
    'orange-filled',
    'yellow-filled',
    'cyan-filled',
    'red-filled'
];

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag styleType={styleType} icon="circle-fill" closable style={{ width: '120px' }}>
                        标签文本
                    </Tag>
                ))}
            </Box>
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag styleType={styleType}  closable  border={false}   >
                        标签文本
                    </Tag>
                ))}
            </Box>
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag styleType={styleType} icon="circle-fill"  iconSize={'xs'} borderType={"circle"}  >
                        标签文本
                    </Tag>
                ))}
            </Box>
            <Box spacing={['md', 'md']}>
                <Tag.Group exposeCount={3}>
                    {styleTypes.map(styleType => (
                        <Tag styleType={styleType}   iconSize={'xs'}   >
                            标签文本
                        </Tag>
                    ))}
         
                </Tag.Group>
            </Box>
            <Box spacing={['md', 'md']}>
                {styleTypes.map(styleType => (
                    <Tag.Icon styleType={styleType} icon="circle-fill" closable>
                        标签文本
                    </Tag.Icon>
                ))}
            </Box>
        </Box>
    );
};

export default React.memo(Demo);
