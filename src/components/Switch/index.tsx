import Switch, { SwitchProps } from './Switch';

type TExportSwitch = typeof Switch & {
    Sizes: ('sm' | 'md' | 'lg')[];
};

const ExportSwitch = Switch as TExportSwitch;
ExportSwitch.Sizes = ['sm', 'md', 'lg'];

export default Switch;
export type { SwitchProps };
