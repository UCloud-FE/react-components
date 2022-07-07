import { useContext } from 'react';

import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

const useConfig = () => {
    return useContext(ConfigContext);
};

export default useConfig;
