import { useEffect } from 'react';

const useInitial = (callBack: () => void) => {
    useEffect(() => {
        callBack?.();
        // only run when first mounted
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useInitial;
