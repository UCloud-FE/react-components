import { ExportComponent } from 'src/type';

import Tabs from './Tabs';
import Pane from './Pane';
import { TabBarPositions, Sizes, StyleTypes } from './shared';

const ExportTabs = ExportComponent<
    typeof Tabs,
    {
        Pane: typeof Pane;
        /** @private 请勿使用 */
        StyleTypes: typeof StyleTypes;
        /** @deprecated 请勿使用 */
        StyleType: typeof StyleTypes;
        /** @private 请勿使用 */
        Sizes: typeof Sizes;
        /** @deprecated 请勿使用 */
        Size: typeof Sizes;
        /** @private 请勿使用 */
        TabBarPositions: typeof TabBarPositions;
        /** @deprecated 请勿使用 */
        Position: typeof TabBarPositions;
    }
>(Tabs, {
    Pane,
    StyleTypes,
    StyleType: StyleTypes,
    Sizes,
    Size: Sizes,
    TabBarPositions,
    Position: TabBarPositions
});
export default ExportTabs;
