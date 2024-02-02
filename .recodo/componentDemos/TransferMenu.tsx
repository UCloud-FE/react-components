import React from 'react';
import { TransferMenu, Box } from '@ucloud-fe/react-components';

const dataSource = new Array(5).fill(null).map((v, i) => ({
  key: i,
  label: `资源 ${i}`
}));

const Demo = () => {
  return (
    <Box container direction="column" spacing="lg">
      <TransferMenu dataSource={dataSource} />
      <TransferMenu dataSource={dataSource} disabled={true} />
    </Box>
  );
};

export default React.memo(Demo);
