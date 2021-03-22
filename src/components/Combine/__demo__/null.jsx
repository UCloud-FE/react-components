import React from 'react';

import Combine from 'src/components/Combine';
import Input from 'src/components/Input';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Combine separator="-">
                {undefined}
                <Input />
                {null}
                {undefined}
                {''}
                {false}
            </Combine>
        </div>
    </div>
);
// demo end

export default Demo;
