import React from 'react';
import { Tree, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  const list = [{ props: { disabled: false } }, { props: { disabled: true } }, { props: { multiple: true } }];

  const generateItems = (count: number, prefix: string, depth?: number) => {
    return new Array(count).fill(null).map((v, i) => {
      const key = `${prefix}-${i}-item`;
      let subItems = [] as {
        key: string;
        title: string;
      }[];
      if (depth) {
        subItems = generateItems(3, key, depth - 1);
      }
      const item = {
        key: key,
        title: key,
        children: undefined as
          | {
              key: string;
              title: string;
            }[]
          | undefined
      };
      if (subItems.length) {
        item.children = subItems;
      }
      return item;
    });
  };

  const generateGroupData = (depth: number, prefix: string) => {
    const menuItems = generateItems(3, prefix, depth);
    return menuItems;
  };

  const _dataSource = generateGroupData(3, 'root');

  return (
    <Box container direction="column" spacing="lg">
      {list.map(({ props }) => (
        <Tree dataSource={_dataSource} {...props} />
      ))}
    </Box>
  );
};

export default React.memo(Demo);
