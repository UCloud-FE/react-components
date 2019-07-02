import React from 'react';
import Radio from 'components/Radio';

// demo start
const { StyleType } = Radio;
const Demo = () => (
    <div>
        {StyleType.map(styleType => (
            <div className="demo-wrap" key={styleType}>
                <Radio styleType={styleType}>{styleType}</Radio>
            </div>
        ))}
        <div className="demo-wrap">
            <Radio styleType="card" title="card" />
        </div>
    </div>
);
// demo end

export default Demo;
