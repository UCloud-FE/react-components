import { ExportComponent } from 'src/type';

import Badge, { BadgeProps } from './Badge';
import Bubble from './Bubble';

const ExportBadge = ExportComponent(Badge, {
    Bubble
});

export default ExportBadge;
export type { BadgeProps };
