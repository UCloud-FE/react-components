import React from 'react';

import { Group, SelectedMap } from './interface';

const TreeContext = React.createContext<{ selectedMap: SelectedMap; group: Group }>({ selectedMap: {}, group: {} });
export default TreeContext;
