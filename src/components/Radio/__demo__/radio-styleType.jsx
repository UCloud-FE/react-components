import React from 'react';

import Radio from 'src/components/Radio';
import Combine from 'src/components/Combine';

// demo start
const { StyleType } = Radio;
const list = [{ checked: false }, { checked: true }, { disabled: true }, { checked: true, disabled: true }];
const Demo = () => (
    <div>
        {StyleType.map(styleType =>
            styleType === 'list' ? (
                <div className="demo-wrap" key={styleType}>
                    {list.map((props, i) => (
                        <Radio styleType={styleType} key={i} {...props}>
                            {styleType}
                        </Radio>
                    ))}
                </div>
            ) : (
                <Combine className="demo-wrap" key={styleType}>
                    {list.map((props, i) => (
                        <Radio styleType={styleType} key={i} {...props}>
                            {styleType}
                        </Radio>
                    ))}
                </Combine>
            )
        )}
        <Combine className="demo-wrap">
            {list.map((props, i) => (
                <Radio styleType="card" title="card" key={i} {...props} />
            ))}
        </Combine>
        <div className="demo-wrap">
            {list.map((props, i) => (
                <div key={i}>
                    <Radio styleType="list" extra={<span>备注</span>} {...props}>
                        <p>title</p>
                        <p>content</p>
                    </Radio>
                </div>
            ))}
        </div>
        <div className="demo-wrap">
            {list.map((props, i) => (
                <div key={i}>
                    <Radio styleType="list" extra={<span>备注</span>} {...props}>
                        longcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontent
                    </Radio>
                </div>
            ))}
        </div>
    </div>
);
// demo end

export default Demo;
