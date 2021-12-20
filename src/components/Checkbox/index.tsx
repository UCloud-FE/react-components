import { ExportComponent } from 'src/type';

import Checkbox, { CheckboxProps } from './Checkbox';
import Group from './Group';
import { StyleTypes, Sizes } from './interface';

const ExportCheckbox = ExportComponent(Checkbox, {
    Group,
    /** @deprecated */
    StyleType: StyleTypes,
    /** @deprecated */
    Size: Sizes
});

export default ExportCheckbox;
export type { CheckboxProps };
