import React from 'react';
import LocaleProvider from 'src/components/LocaleProvider';
import Pagination from 'src/components/Pagination';

// demo start
const Demo = () => (
    <div>
        <LocaleProvider locale={{ Pagination: { items_per_page: 'items per page', jump_to_confirm: 'CONFIRM' } }}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </LocaleProvider>
    </div>
);
// demo end

export default Demo;
