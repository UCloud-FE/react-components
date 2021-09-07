import { ExportComponent } from 'src/type';

import Breadcrumb from './Breadcrumb';
import Item from './Item';
import BackButton from './BackButton';
import { StyleTypes } from './interface';

const ExportBreadcrumb = ExportComponent(Breadcrumb, {
    Item,
    BackButton,
    StyleType: StyleTypes,
    defaultProps: {}
});

export default ExportBreadcrumb;
