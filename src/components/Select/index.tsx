import { ExportComponent, Sizes } from 'src/type';

import Select from './Select';
import Option from './Option';
import Group from './Group';
import Extra from './Extra';

const ExportSelect = ExportComponent(Select, {
    Option,
    Group,
    Extra,
    Size: Sizes
});

export default ExportSelect;
