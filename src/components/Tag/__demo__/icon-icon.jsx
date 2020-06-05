import React from 'react';

import Tag from 'src/components/Tag';
import Icon from 'src/components/Icon';

// demo start
class Demo extends React.Component {
    render() {
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
