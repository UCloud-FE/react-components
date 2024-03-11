import React from 'react';
import { Skeleton, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  return (
    <Box container direction="column" spacing="lg">
      <Skeleton />
      <Skeleton animated />
    </Box>
  );
};

export default React.memo(Demo);
