import { ReactNode } from 'react';

export type Key = string;
export type SelectedMap = Record<Key, true>;
export type Group = Record<Key, GroupDetail>;
export interface GroupDetail {
    disabledKeys: Key[];
    keys: Key[];
}
export interface TreeData {
    key: Key;
    title: ReactNode;
    children?: TreeData[];
    disabled?: boolean;
}

export type ChangeKeyMap = Record<Key, boolean>;
