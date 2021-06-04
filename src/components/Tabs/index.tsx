import Tabs from './Tabs';
import Pane from './Pane';
import { TabBarPositions, Sizes, StyleTypes } from './shared';

import { ExportComponent } from 'src/type';

const ExportTabs = ExportComponent(Tabs, {
    Pane,
    StyleTypes,
    Sizes,
    TabBarPositions
});
export default ExportTabs;
