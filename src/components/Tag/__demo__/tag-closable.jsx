import React from 'react';

import Tag from 'src/components/Tag';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill">Content</Tag>
                </div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" closable onClose={console.log}>
                        Content
                    </Tag>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
