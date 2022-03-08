import { ExportComponent } from 'src/type';

import Tag from './Tag';
import Group from './Group';
import IconTag from './Icon';

const ExportTag = ExportComponent(Tag, {
    Group,
    Icon: IconTag
});

export default ExportTag;
