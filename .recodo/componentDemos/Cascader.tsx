import React from 'react';
import { Cascader, Box } from '@ucloud-fe/react-components';

const Demo = () => {
  const generateNumber = (min: number, max: number) => {
    const random = Math.random();
    return (min + random * (max + 1 - min)) | 0;
  };

  const generateItems = (count: number, prefix: string, depth?: number) => {
    return new Array(count).fill(null).map((v, i) => {
      const key = `${prefix}-${i}-item`;
      let subItems: {
        key: string;
        title: string;
        disabled: boolean;
      }[] = [];
      if (depth) {
        subItems = generateItems(generateNumber(0, 5), key, depth - 1);
      }
      const item = {
        key: key,
        title: ' ✨ ' + key,
        disabled: Math.random() > 0.8,
        children: undefined as { key: string; title: string; disabled: boolean }[] | undefined
      };
      if (subItems.length) {
        item.children = subItems;
      }
      return item;
    });
  };

  const generateGroupData = (depth: number, prefix: string) => {
    const itemCount = generateNumber(1, 5);
    const menuItems = generateItems(itemCount, prefix, depth);
    return menuItems;
  };

  const _dataSource = generateGroupData(generateNumber(2, 6), 'root');

  const list = [
    { props: { size: 'sm' as 'sm' | 'md' | 'lg' } },
    { props: { size: 'md' as 'sm' | 'md' | 'lg' } },
    { props: { size: 'lg' as 'sm' | 'md' | 'lg' } },
    { props: { disabled: true } },
    { props: { clearable: true } }
  ];

  return (
    <Box container direction="column" spacing="lg">
      {list.map(({ props }) => (
        <Cascader {...props} dataSource={_dataSource} />
      ))}
    </Box>
  );
};

export default React.memo(Demo);
