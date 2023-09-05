import { ItemType } from './type';

export const getTreeAllKeys = (keys: React.Key[] = [], treeData: ItemType[]) => {
    treeData.forEach(v => {
        v?.key && !keys.includes(v.key) && keys.push(v.key);
        v && 'children' in v && v?.children && getTreeAllKeys(keys, v.children);
    });
    return keys;
};
