import React from 'react';
import { Radio, Box, RadioStyleType } from '@ucloud-fe/react-components';

const Demo = () => {
    const list = [
        { props: { checked: true, value: 'checked' }, label: '选中' },
        { props: { checked: false, value: 'unchecked' }, label: '默认' },
        { props: { disabled: true, value: 'disabled' }, label: '禁用' },
        { props: { checked: true, value: 'checkedDisabled', disabled: true }, label: '选中且禁用' }
    ];
    const styleTypes: RadioStyleType[] = ['default', 'button', 'card', 'list'];
    return (
        <Box container direction="column" spacing="lg">
            {styleTypes.map(styleType => (
                <Box spacing="md" key={styleType}>
                    {list.map(({ props, label }) => (
                        <Radio styleType={styleType} title="标题" extra="备注" {...props}>
                            {label}
                        </Radio>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
