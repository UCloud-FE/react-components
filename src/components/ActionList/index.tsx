import { ExportComponent } from 'src/type';
import Button from 'src/components/Button';

import ActionList, { ActionListProps } from './ActionList';

const Sizes = Button.Sizes;
const ButtonStyleTypes = Button.StyleTypes;

const ExportActionList = ExportComponent(ActionList, {
    Sizes,
    ButtonStyleTypes
});

export default ExportActionList;
export type { ActionListProps };
