import { useCallback, useMemo, useState } from 'react';

const useUncontrolled = <V, P = V, VT = V | undefined>(
    value: VT,
    defaultValue: V,
    onChange?: (v: P) => void
): [V, (v: P) => void, (v: P) => void] => {
    const isControlled = useMemo(() => value !== undefined, [value]);
    const [v, setV] = useState<V>(() => (isControlled ? ((value as unknown) as V) : defaultValue));
    const finalValue = isControlled ? ((value as unknown) as V) : v;
    const o = useCallback(
        (v: P) => {
            if (!isControlled) setV((v as unknown) as V);
            onChange?.(v);
        },
        [onChange, isControlled]
    );

    const updateValueWithoutCallOnChange = useCallback(
        (v: P) => {
            if (!isControlled) setV((v as unknown) as V);
        },
        [isControlled]
    );

    return [finalValue, o, updateValueWithoutCallOnChange];
};

export default useUncontrolled;
