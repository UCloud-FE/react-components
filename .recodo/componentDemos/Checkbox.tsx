import React from 'react';
import { Checkbox, Box, CheckboxProps } from '@ucloud-fe/react-components';

const Demo = () => {
    const list = [
        { props: { checked: true, value: 'checked' }, label: '选中' },
        { props: { checked: false, value: 'unchecked' }, label: '默认' },
        { props: { disabled: true, value: 'disabled' }, label: '禁用' },
        { props: { checked: true, value: 'checkedDisabled', disabled: true }, label: '选中且禁用' },
        { props: { indeterminate: true, value: 'indeterminate' }, label: '部分选中' },
        { props: { indeterminate: true, value: 'indeterminate', disabled: true }, label: '部分选中且禁用' }
    ];
    const styleTypes: CheckboxProps['styleType'][] = ['default', 'card'];
    return (
        <Box container direction="column" spacing="lg">
            {styleTypes.map(styleType => (
                <Box spacing="md" key={styleType}>
                    {list.map(({ props, label }) => (
                        <Checkbox styleType={styleType} title="标题" {...props}>
                            {label}
                        </Checkbox>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
