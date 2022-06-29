import { createContext } from 'react';

import { Key } from 'src/hooks/group';
import noop from 'src/utils/noop';

const SelectContext = createContext<{
    hidePopup: () => void;
    handleSearch: (value: Key, props: any) => boolean | [string, string, string];
    searchValue: string;
}>({
    hidePopup: noop,
    handleSearch: () => true,
    searchValue: ''
});
export default SelectContext;
