import { Value } from './interface';

export const getSelectedStatus = (array: Value[], value: Record<Value, boolean>): 'ALL' | 'NONE' | 'SOME' => {
    if (!array?.length || !Object.keys(value).length) return 'NONE';
    const total = array.length;
    let count = 0;
    array.forEach(v => {
        if (value[v]) {
            count++;
        }
    });
    return count === 0 ? 'NONE' : total === count ? 'ALL' : 'SOME';
};
