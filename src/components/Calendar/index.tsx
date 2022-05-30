import Calendar from './Calendar';
import Month from './Month';
import TwoSide from './TwoSide';

type TExportCalendar = typeof Calendar & {
    Month: typeof Month;
    TwoSide: typeof TwoSide;
};

const ExportCalendar: TExportCalendar = Calendar as TExportCalendar;
ExportCalendar.Month = Month;
ExportCalendar.TwoSide = TwoSide;

export default ExportCalendar;

export { TwoSide };
