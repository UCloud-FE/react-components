import { useEffect, useRef } from 'react';

const useIsInitial = () => {
    const isFirst = useRef(true);
    useEffect(() => {
        setTimeout(() => (isFirst.current = false), 0);
    }, []);
    return isFirst.current;
};

export default useIsInitial;
