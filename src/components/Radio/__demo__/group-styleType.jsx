import React from 'react';
import Radio from 'components/Radio';

// demo start
const { StyleType } = Radio;
const options = [1, 2, 3];
const Demo = () => (
    <div>
        {StyleType.map(styleType => (
            <div className="demo-wrap" key={styleType}>
                <Radio.Group styleType={styleType} options={options.map(v => ({ value: v }))} />
            </div>
        ))}
        <div className="demo-wrap">
            <Radio.Group styleType="card" options={options.map(v => ({ value: v, title: 'card' }))} />
        </div>
        <div className="demo-wrap">
            <Radio.Group styleType="list" options={options.map(v => ({ value: v, extra: '备注' }))} />
        </div>
    </div>
);
// demo end

export default Demo;
