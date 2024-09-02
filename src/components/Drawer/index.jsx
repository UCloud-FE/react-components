import { ExportComponent } from 'src/type';

import Drawer from './Drawer';
import Title from './Title';
import Content from './Content';

const ExportDrawer = ExportComponent(Drawer, {
    Title,
    Content
});

export default ExportDrawer;
