import React from 'react';
import { TimePicker, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  const list = [
    { props: { size: 'sm' as 'sm' | 'md' | 'lg' } },
    { props: { size: 'md' as 'sm' | 'md' | 'lg' } },
    { props: { size: 'lg' as 'sm' | 'md' | 'lg' } },
    { props: { disabled: true } }
  ];

  return (
    <Box container direction="column" spacing="lg">
      {list.map(({ props }) => (
        <TimePicker {...props} />
      ))}
    </Box>
  );
};

export default React.memo(Demo);
