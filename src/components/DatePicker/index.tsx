import { Sizes } from 'src/type';

import DatePicker from './DatePicker';
import Month from './Month';
import Range from './Range';

type TExportDatePicker = typeof DatePicker & {
    Month: typeof Month;
    Range: typeof Range;
    Sizes: typeof Sizes;
};

const ExportDatePicker: TExportDatePicker = DatePicker as TExportDatePicker;
ExportDatePicker.Month = Month;
ExportDatePicker.Range = Range;
ExportDatePicker.Sizes = Sizes;

export default ExportDatePicker;
