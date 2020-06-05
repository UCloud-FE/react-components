import React from 'react';

import Tag from 'src/components/Tag';

// demo start
const { StyleType } = Tag;
class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>状态</h3>
                <div className="demo-wrap">
                    {['default', 'success', 'warning', 'error'].map(styleType => (
                        <div key={styleType}>
                            <Tag styleType={styleType} icon="circle-fill" closable>
                                Content
                            </Tag>
                        </div>
                    ))}
                </div>
                <h3>预设颜色</h3>
                <div className="demo-wrap">
                    {StyleType.filter(v => !{ success: 1, warning: 1, error: 1 }[v]).map(styleType => (
                        <div key={styleType}>
                            <Tag styleType={styleType} icon="circle-fill" closable>
                                Content
                            </Tag>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
