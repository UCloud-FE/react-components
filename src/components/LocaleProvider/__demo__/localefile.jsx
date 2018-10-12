import React from 'react';

import LocaleProvider from 'src/components/LocaleProvider';
import Pagination from 'src/components/Pagination';
import locale from 'src/components/LocaleProvider/locale/en_US';

const Demo = () => (
    <div>
        <LocaleProvider locale={locale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);

export default Demo;
