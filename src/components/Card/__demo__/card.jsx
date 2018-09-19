import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';

// demo start
const Demo = () => (
    <Card>
        <Card.Header comment="This is the comment">This is the title</Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
// demo end

export default Demo;
