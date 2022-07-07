import { setConfig } from 'src/config';
import { ExportComponent } from 'src/type';

import ConfigProvider from './ConfigProvider';

const ExportConfigProvider = ExportComponent(ConfigProvider, {
    setConfig
});

export default ExportConfigProvider;
