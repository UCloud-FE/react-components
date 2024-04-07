import React from 'react';
import { Card, Button } from '@ucloud-fe/react-components';

const Demo = () => {
  return (
    <Card>
      <Card.Header comment="This is the comment">This is the title</Card.Header>
      <Card.Action>
        <Button>This is a action button</Button>
        <Button>This is a action button</Button>
      </Card.Action>
      <Card.Content>
        <Card.SubArea title="子标题">
          <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Card.SubArea>
        <Card.SubArea title="子标题">
          <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Card.SubArea>
      </Card.Content>
      <Card.Footer>
        <Button style={{ float: 'right' }}>This is a footer button</Button>
      </Card.Footer>
    </Card>
  );
};

export default React.memo(Demo);
