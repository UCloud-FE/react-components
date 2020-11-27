import React from 'react';

import Tag from 'src/components/Tag';
import Icon from 'src/components/Icon';

// demo start
let TrueIcon = Icon;
// Icon 在 context 中被文档强行覆盖，这里重新取一下
if (window.Icon) TrueIcon = window.Icon;
class Demo extends React.Component {
    render() {
        const Icon = TrueIcon;
        return (
            <div>
                <div className="demo-wrap">
                    {['circle', 'circle-fill', 'loading', <Icon type="loading" key="123" spin />].map((icon, i) => (
                        <div key={i}>
                            <Tag.Icon icon={icon} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
