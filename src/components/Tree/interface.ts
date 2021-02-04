import { ReactNode } from 'react';

export type Value = string;
export type SelectedMap = Record<Value, true>;
export type Group = Record<Value, Value[]>;
export interface TreeData {
    value: Value;
    title: ReactNode;
    children?: TreeData[];
    disabled?: boolean;
}

export type ChangeValueMap = Record<Value, boolean>;
