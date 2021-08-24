import { ExportComponent } from 'src/type';

import Menu from './Menu';
import Item from './Item';
import SubMenu from './SubMenu';

const ExportMenu = ExportComponent(Menu, {
    Item,
    SubMenu
});

export default ExportMenu;
export { Item, SubMenu };
