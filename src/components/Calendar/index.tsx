import Calendar from './Calendar';
import Month from './Month';

type TExportCalendar = typeof Calendar & {
    Month: typeof Month;
};

const ExportCalendar: TExportCalendar = Calendar as TExportCalendar;
ExportCalendar.Month = Month;

export default ExportCalendar;
