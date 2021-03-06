import { ReactNode } from 'react';

export type Key = string;
export type SelectedMap = Record<Key, true>;
export type Group = Record<Key, GroupDetail>;
export interface GroupDetail {
    disabledKeys: Key[];
    keys: Key[];
}
export interface TreeData {
    // 唯一键，所有值的字符串不得重复，会用作 key 和选中判定，如果为其它值会转为 string 再应用
    key: Key;
    // 选项标题内容
    title: ReactNode;
    // 子数据，存在即为父节点，不存在即为叶子结点，与程序树有差异，原因详见说明
    children?: TreeData[];
    // 是否禁用，父节点禁用会禁用所有子孙节点
    disabled?: boolean;
    // 是否强制为父节点
    isParent?: boolean;
}

export interface LoadData {
    (key: Key): Promise<void>;
}
export type ChangeKeyMap = Record<Key, boolean>;
