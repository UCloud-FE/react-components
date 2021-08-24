import useIsInitial from './useIsInitial';

const useInitial = (cb: () => void) => {
    const isInitial = useIsInitial();
    if (isInitial) cb();
};

export default useInitial;
