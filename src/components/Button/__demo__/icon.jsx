import React from 'react';

import Button from 'src/components/Button';
import Icon from 'src/components/Icon';

// demo start
const icons = ['loading', 'link', 'check'];

const Demo = () => {
    return (
        <div>
            {icons.map(icon => (
                <Button icon={icon} key={icon} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
            {icons.map(icon => (
                <Button icon={<Icon type={icon} spin />} key={icon} onClick={() => console.log('clicked')}>
                    Button
                </Button>
            ))}
            {icons.map(icon => (
                <Button key={icon} onClick={() => console.log('clicked')}>
                    Button <Icon type={icon} spin /> Button
                </Button>
            ))}
        </div>
    );
};
// demo end

export default Demo;
