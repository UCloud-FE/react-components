import { ExportComponent } from 'src/type';

import Collapse from './Collapse';
import Panel from './Panel';

const ExportCollapse = ExportComponent(Collapse, {
    Panel
});

export default ExportCollapse;
export { Panel };
