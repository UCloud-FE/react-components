import React from 'react';

import Card from 'src/components/Card';
import Button from 'src/components/Button';
import Box from 'src/components/Box';

// demo start
const Demo = () => (
    <div>
        <div className="demo-wrap">
            <h2>Header：用作标题、副标题展示</h2>
            <Card>
                <Card.Header comment="This is the comment">This is the title</Card.Header>
            </Card>
            <h2>也可配合 Box 在右上角添加操作按钮</h2>
            <Card>
                <Card.Header comment="This is the comment">
                    <Box container justifyContent="space-between">
                        <div>This is the title</div>
                        <Button>Action</Button>
                    </Box>
                </Card.Header>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Action：用作操作栏的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Action>
                    <Button>This is a action button</Button>
                    <Button>This is a action button</Button>
                </Card.Action>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Content：用作内容区域的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Content>
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Card.Content>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>Footer：用作底部操作的展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Footer>
                    <Button style={{ float: 'right' }}>This is a footer button</Button>
                </Card.Footer>
            </Card>
        </div>
        <div className="demo-wrap">
            <h2>SubArea：用作内容区域分割展示</h2>
            <Card>
                <Card.Header>This is the title</Card.Header>
                <Card.Content>
                    <Card.SubArea title="子标题">
                        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                    </Card.SubArea>
                    <Card.SubArea title="子标题">
                        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                    </Card.SubArea>
                </Card.Content>
            </Card>
        </div>
    </div>
);
// demo end

export default Demo;
