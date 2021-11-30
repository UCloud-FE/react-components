import React from 'react';

import noop from 'src/utils/noop';

import { Key } from './interface';

const CascadeContext = React.createContext<{
    expandItem: (expandedKey: Key[]) => void;
    selectItem: (selectedKey: Key[]) => void;
}>({
    expandItem: noop,
    selectItem: noop
});

export default CascadeContext;
