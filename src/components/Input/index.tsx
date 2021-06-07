import NumberInput from 'src/components/NumberInput';
import Textarea from 'src/components/Textarea';
import { ExportComponent, Sizes } from 'src/type';

import Input from './Input';
import Search from './Search';

const ExportInput = ExportComponent(Input, {
    Search,
    Number: NumberInput,
    Textarea,
    Sizes
});

export default ExportInput;
