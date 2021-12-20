import { ExportComponent } from 'src/type';

import Notice, { StyleTypes, NoticeProps } from './Notice';

const ExportNotice = ExportComponent(Notice, {
    /** @deprecated */
    StyleType: StyleTypes
});

export default ExportNotice;
export type { NoticeProps };
