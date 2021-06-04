import { ReactElement } from 'react';

import { tuple } from 'src/style';

import { TabPaneProps } from './Pane';

export const TabBarPositions = tuple('top', 'bottom', 'left', 'right');
export const StyleTypes = tuple('default', 'ink', 'pure');
export const Sizes = tuple('sm', 'md', 'lg');
export type TabBarPosition = typeof TabBarPositions[number];
export type StyleType = typeof StyleTypes[number];
export type Size = typeof Sizes[number];
export type Panes = { pane: ReactElement<TabPaneProps>; key: string }[];
