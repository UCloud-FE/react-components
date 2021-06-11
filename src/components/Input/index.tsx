import NumberInput from 'src/components/NumberInput';
import Textarea from 'src/components/Textarea';
import { ExportComponent, FunctionToClassComponent, Sizes } from 'src/type';

import Input from './Input';
import Search from './Search';

// bind to avoid demo crash
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExportInput = ExportComponent(Input, {
    Search,
    Number: NumberInput,
    Textarea,
    Sizes
});

const ClassInput = FunctionToClassComponent(Input);
const ClassSearch = FunctionToClassComponent(Search);

const ExportClassInput = ExportComponent(ClassInput, {
    Search: ClassSearch,
    Number: NumberInput,
    Textarea,
    Sizes
});

export default ExportClassInput;
