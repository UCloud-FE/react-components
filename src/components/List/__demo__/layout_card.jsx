import React from 'react';
import List from 'src/components/List';
import Card from 'src/components/Card';

// demo start
const Demo = () => {
    return (
        <>
            <List
                styleType="custom"
                spacing={[12, 12]}
                colWitdh={400}
                items={[
                    <Card key={1}>
                        <Card.Header>This is the title</Card.Header>
                        <Card.Content>This is the Content</Card.Content>
                    </Card>,
                    <Card key={2}>
                        <Card.Header>This is the title</Card.Header>
                        <Card.Content>This is the Content</Card.Content>
                    </Card>,
                    <Card key={3}>
                        <Card.Header>This is the title</Card.Header>
                        <Card.Content>This is the Content</Card.Content>
                    </Card>,
                    <Card key={4}>
                        <Card.Header>This is the title</Card.Header>
                        <Card.Content>This is the Content</Card.Content>
                    </Card>
                ]}
            />
        </>
    );
};
// demo end

export default Demo;
