import React from 'react';
import { AutoComplete, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  const list = [{ props: { disabled: false } }, { props: { disabled: true } }, { props: { loading: true } }];

  return (
    <Box container direction="column" spacing="lg">
      {list.map(({ props }) => (
        <AutoComplete {...props} status="default" />
      ))}
    </Box>
  );
};

export default React.memo(Demo);
