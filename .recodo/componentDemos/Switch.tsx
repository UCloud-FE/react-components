import React from 'react';
import { Switch, SwitchProps, Box } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {(['sm', 'md', 'lg'] as SwitchProps['styleType'][]).map(size => (
                <Box spacing="md" key={size}>
                    {[false, true].map(disabled =>
                        [false, true].map(checked => (
                            <Switch
                                size={size}
                                disabled={disabled}
                                checked={checked}
                                key={`size-${size}_disabled-${disabled}_checked-${checked}`}
                            />
                        ))
                    )}
                </Box>
            ))}
        </Box>
    );
};
export default React.memo(Demo);
