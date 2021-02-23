import { Key } from './interface';

export const getSelectedStatus = (
    keys: Key[],
    selectedMap: Record<Key, boolean>,
    disabledKeys?: Key[]
): 'ALL' | 'NONE' | 'SOME' => {
    if ((!keys?.length && !disabledKeys?.length) || !Object.keys(selectedMap).length) return 'NONE';
    const total = keys.length;
    let count = 0;
    keys.forEach(v => {
        if (selectedMap[v]) {
            count++;
        }
    });
    if (count === 0 && disabledKeys?.length) {
        let disabledSelectedCount = 0;
        disabledKeys.forEach(v => {
            if (selectedMap[v]) {
                disabledSelectedCount++;
            }
        });
        if (disabledSelectedCount > 0) return 'SOME';
    }
    return count === 0 ? 'NONE' : total === count ? 'ALL' : 'SOME';
};
