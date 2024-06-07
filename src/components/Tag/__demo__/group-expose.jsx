import React from 'react';

import Tag from 'src/components/Tag';

// demo start
class Demo extends React.Component {
    render() {
        return (
            <div>
                <h3>默认状态</h3>
                <div className="demo-wrap">
                    <Tag.Group exposeCount={3}>
                        <Tag icon="circle-fill">Tag Content1</Tag>
                        <Tag icon="circle-fill">Tag Content2</Tag>
                        <Tag icon="circle-fill">Tag Content3</Tag>
                        <Tag icon="circle-fill">Tag Content4</Tag>
                        <Tag icon="circle-fill">Tag Content5</Tag>
                        <Tag icon="circle-fill">Tag Content6</Tag>
                        <Tag icon="circle-fill">Tag Content7</Tag>
                    </Tag.Group>
                </div>
                <h3>exposeCount设置为0</h3>
                <div className="demo-wrap">
                    <Tag.Group exposeCount={0}>
                        <Tag closable>
                            Tag Content1<a>测试</a>
                        </Tag>
                        <Tag closable>Tag Content2Tag Content2</Tag>
                        <Tag closable>Tag Content3</Tag>
                        <Tag closable>Tag Content4</Tag>
                        <Tag closable>Tag Content5</Tag>
                        <Tag closable>Tag Content6</Tag>
                        <Tag closable>Tag Content7</Tag>
                        <Tag closable>Tag Content8</Tag>
                        <Tag closable>Tag Content9</Tag>
                        <Tag closable>Tag Content10</Tag>
                        <Tag closable>Tag Content11</Tag>
                        <Tag closable>Tag Content12</Tag>
                        <Tag closable>Tag Content13</Tag>
                        <Tag closable>Tag Content14</Tag>
                    </Tag.Group>
                </div>
                <h3>不设置exposeCount</h3>
                <div className="demo-wrap">
                    <Tag.Group>
                        <Tag>Tag Content1</Tag>
                        <Tag>Tag Content2</Tag>
                        <Tag>Tag Content3</Tag>
                        <Tag>Tag Content4</Tag>
                        <Tag>Tag Content5</Tag>
                        <Tag>Tag Content6</Tag>
                        <Tag>Tag Content7</Tag>
                        <Tag>Tag Content8</Tag>
                        <Tag>Tag Content9</Tag>
                        <Tag>Tag Content10</Tag>
                        <Tag>Tag Content11</Tag>
                        <Tag>Tag Content12</Tag>
                        <Tag>Tag Content13</Tag>
                        <Tag>Tag Content14</Tag>
                    </Tag.Group>
                </div>
            </div>
        );
    }
}
// demo end

export default Demo;
