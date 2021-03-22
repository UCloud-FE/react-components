import { useCallback, useMemo, useState } from 'react';

const useUncontrolled = <V, Arg = unknown[], VT = V | undefined>(
    value: VT,
    defaultValue: V,
    onChange: ((v: V, ...args: Arg[]) => void) | undefined
): [V, (v: V, ...args: Arg[]) => void] => {
    const isControlled = useMemo(() => value !== undefined, [value]);
    const [v, setV] = useState<V>(() => (isControlled ? ((value as unknown) as V) : defaultValue));
    const finalValue = isControlled ? ((value as unknown) as V) : v;
    const o = useCallback(
        (v: V, ...args: Arg[]) => {
            if (!isControlled) setV(v);
            onChange?.(v, ...args);
        },
        [onChange, isControlled]
    );
    return [finalValue, o];
};

export default useUncontrolled;
