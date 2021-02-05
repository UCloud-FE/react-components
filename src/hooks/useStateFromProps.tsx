import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const useStateFromProps = <T, S>(
    props: T,
    handle: (props: T, isFirst?: boolean) => S
): [S, Dispatch<SetStateAction<S>>] => {
    const [state, setState] = useState<S>(() => handle(props, true));
    const isFirst = useRef(true);
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        setState(handle(props));
    }, [handle, props]);
    return [state, setState];
};

export default useStateFromProps;
