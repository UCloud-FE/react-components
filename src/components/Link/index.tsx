import Link from './Link';
import Button from './Button';

import { ExportComponent } from 'src/type';

const ExportLink = ExportComponent(Link, {
    Button
});

export default ExportLink;
