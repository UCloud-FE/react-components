import { Value } from './interface';

export const getSelectedStatus = (
    values: Value[],
    selectedMap: Record<Value, boolean>,
    disabledValues?: Value[]
): 'ALL' | 'NONE' | 'SOME' => {
    if ((!values?.length && !disabledValues?.length) || !Object.keys(selectedMap).length) return 'NONE';
    const total = values.length;
    let count = 0;
    values.forEach(v => {
        if (selectedMap[v]) {
            count++;
        }
    });
    if (count === 0 && disabledValues?.length) {
        let disabledSelectedCount = 0;
        disabledValues.forEach(v => {
            if (selectedMap[v]) {
                disabledSelectedCount++;
            }
        });
        if (disabledSelectedCount > 0) return 'SOME';
    }
    return count === 0 ? 'NONE' : total === count ? 'ALL' : 'SOME';
};
