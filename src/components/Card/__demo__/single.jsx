import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';

// demo start
const Demo = () => (
    <div>
        <Card>
            <Card.Content>
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Card.Content>
        </Card>
        <Card style={{ marginTop: 12 }}>
            <Card.Header comment="This is the comment">This is the title</Card.Header>
            <Card.Action>
                <Button>This is a action button</Button>
                <Button>This is a action button</Button>
            </Card.Action>
        </Card>
        <Card style={{ marginTop: 12 }}>
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>卡片本身无间距</div>
        </Card>
    </div>
);
// demo end

export default Demo;
