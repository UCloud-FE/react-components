import React from 'react';
import { ActionList, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  const list: { props: { size: 'sm' | 'md' | 'lg'; buttonStyleType: 'primary' | 'border' | 'border-gray' } }[] = [
    { props: { size: 'sm', buttonStyleType: 'primary' } },
    { props: { size: 'md', buttonStyleType: 'primary' } },
    { props: { size: 'lg', buttonStyleType: 'primary' } },
    { props: { size: 'md', buttonStyleType: 'border' } },
    { props: { size: 'md', buttonStyleType: 'border-gray' } }
  ];

  return (
    <Box container direction="column" spacing="lg">
      {list.map(l => (
        <ActionList
          actionList={new Array(5).fill(null).map((v, i) => ({
            label: `Action ${i}`
          }))}
          exposeCount={3}
          {...l.props}
        />
      ))}
    </Box>
  );
};

export default React.memo(Demo);
