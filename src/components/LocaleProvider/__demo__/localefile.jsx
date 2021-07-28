import React from 'react';

import LocaleProvider from 'src/components/LocaleProvider';
import Pagination from 'src/components/Pagination';
import ENLocale from 'src/components/LocaleProvider/locale/en_US';

// demo start
const Demo = () => (
    <div>
        <LocaleProvider locale={ENLocale}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
// demo end

export default Demo;
