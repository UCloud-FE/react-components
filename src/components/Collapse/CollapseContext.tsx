import React from 'react';

import { defaultContext, GroupContext } from 'src/hooks/group';

const CollapseContext = React.createContext<GroupContext>(defaultContext);
export default CollapseContext;
