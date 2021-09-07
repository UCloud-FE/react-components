import { ExportComponent } from 'src/type';

import Breadcrumb, { StyleTypes } from './Breadcrumb';
import Item from './Item';
import BackButton from './BackButton';

const ExportBreadcrumb = ExportComponent(Breadcrumb, {
    Item,
    BackButton,
    StyleType: StyleTypes,
    defaultProps: {}
});

export default ExportBreadcrumb;
