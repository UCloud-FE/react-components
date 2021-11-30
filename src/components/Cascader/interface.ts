import { ReactNode } from 'react';

export type Key = string;

export interface LoadData {
    (expandedKeys: Key[]): Promise<void>;
}

export interface CascadeData {
    // 唯一键，所有值的字符串不得重复，会用作 key 和选中判定，如果为其它值会转为 string 再应用
    key: Key;
    // 选项标题内容
    title: ReactNode;
    // 子数据，存在即为父节点，不存在即为叶子结点，与程序树有差异，原因详见说明
    children?: CascadeData[];
    // 是否禁用，父节点禁用会禁用所有子孙节点
    disabled?: boolean;
    // 是否强制为父节点
    isParent?: boolean;
}
