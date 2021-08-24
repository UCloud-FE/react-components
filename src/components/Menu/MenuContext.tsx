import React from 'react';

import { defaultContext, GroupContext } from 'src/hooks/group';
import LOCALE from './locale/zh_CN';

const MenuContext = React.createContext<GroupContext & { locale: typeof LOCALE }>({
    ...defaultContext,
    locale: LOCALE
});
export default MenuContext;
