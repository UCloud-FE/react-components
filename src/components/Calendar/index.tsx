import Calendar from './Calendar';
import Month from './Month';
import TwoSide from './TwoSide';

type TExportCalendar = typeof Calendar & {
    Month: typeof Month;
    TwoSideCalendar: typeof TwoSide;
};

const ExportCalendar: TExportCalendar = Calendar as TExportCalendar;
ExportCalendar.Month = Month;
ExportCalendar.TwoSideCalendar = TwoSide;

export default ExportCalendar;

export { TwoSide };
