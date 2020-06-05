import React from 'react';

import Tag from 'src/components/Tag';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>默认状态</h3>
                <div className="demo-wrap">
                    <Tag.Group>
                        <Tag.Icon icon="circle" />
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                    </Tag.Group>
                </div>
                <h3>紧凑状态</h3>
                <div className="demo-wrap">
                    <Tag.Group compact>
                        <Tag.Icon icon="circle" />
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                        <Tag>Tag Content</Tag>
                    </Tag.Group>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
