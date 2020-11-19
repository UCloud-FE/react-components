import React from 'react';

import ConfigProvider from 'src/components/ConfigProvider';
import Pagination from 'src/components/Pagination';

// demo start
const Demo = () => (
    <div>
        <ConfigProvider locale={{ Pagination: { itemsPerPage: 'items per page', jumpToConfirm: 'CONFIRM' } }}>
            <Pagination total={100} showSizeChanger showQuickJumper={{ goButton: true }} />
        </ConfigProvider>
    </div>
);
// demo end

export default Demo;
