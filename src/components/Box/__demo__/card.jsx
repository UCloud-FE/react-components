import React from 'react';

import Box from 'src/components/Box';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Card from 'src/components/Card';
import Combine from 'src/components/Combine';

// demo start
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>卡片排版</h2>
            <Box container wrap="wrap" spacing={['lg', 'lg']}>
                <Box span={12}>
                    <Card>
                        <Card.Action>
                            <Box container justifyContent="space-between" alignItems="center">
                                <Combine>
                                    <span>这是一条工具栏</span>
                                    <Button>按钮</Button>
                                    <Icon type="edit" />
                                </Combine>
                                <Combine>
                                    <Button>按钮</Button>
                                </Combine>
                            </Box>
                        </Card.Action>
                    </Card>
                </Box>
                <Box span={4}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 1</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={8}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 2</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={4}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 100 }}>Card 3</div>
                        </Card.Content>
                    </Card>
                </Box>
                <Box span={8}>
                    <Card>
                        <Card.Content>
                            <div style={{ height: 300 }}>Card 4</div>
                        </Card.Content>
                    </Card>
                </Box>
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>卡片自适应宽度排版 - 可以压缩浏览器宽度看效果</h2>
            <Box container wrap="wrap" spacing={['lg', 'lg']} padding="md">
                {new Array(10).fill(null).map((v, i) => (
                    <Box width="300px" flex="1 1 auto" key={i}>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card {i}</div>
                            </Card.Content>
                        </Card>
                    </Box>
                ))}
            </Box>
        </div>
        <div className="demo-wrap">
            <h2>卡片纵向排版</h2>
            <Box spacing="lg" container>
                <Box span={4}>
                    <Box direction="column" spacing="lg">
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 1</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 2</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 3</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 4</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 5</div>
                            </Card.Content>
                        </Card>
                    </Box>
                </Box>
                <Box span={8}>
                    <Box direction="column" spacing="lg">
                        <Card>
                            <Card.Content>
                                <div style={{ height: 100 }}>Card 3</div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <div style={{ height: 800 }}>Card 4</div>
                            </Card.Content>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </div>
    </Box>
);
// demo end

export default Demo;
