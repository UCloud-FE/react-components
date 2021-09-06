import { ExportComponent } from 'src/type';

import Select from './Select';
import Option from './Option';
import Group from './Group';
import Extra from './Extra';

const ExportSelect = ExportComponent(Select, {
    Option,
    Group,
    Extra
});

export default ExportSelect;
