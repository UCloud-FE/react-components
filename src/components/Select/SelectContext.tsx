import { createContext } from 'react';

import { Key } from 'src/hooks/group';

const SelectContext = createContext<{
    searchValue: string;
    handleSearch: (value: Key, item: any) => boolean;
}>({
    searchValue: '',
    handleSearch: () => true
});
export default SelectContext;
