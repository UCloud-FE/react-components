import React from 'react';

import Tag from 'src/components/Tag';

// demo start

class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="demo-wrap">
                    <Tag icon="circle-fill" styleType="orange" closable>
                        Content
                    </Tag>
                </div>
                <div className="demo-wrap">
                    <Tag
                        icon="circle-fill"
                        styleType="orange"
                        closable
                        customStyle={{
                            color: 'white',
                            background: 'red',
                            borderColor: 'orange',
                            closeIconHoverBackground: 'pink'
                        }}
                    >
                        Content
                    </Tag>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
