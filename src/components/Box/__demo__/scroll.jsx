import React from 'react';

import Box from 'src/components/Box';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import Card from 'src/components/Card';

// demo start
const Demo = () => (
    <Box direction="column" alignItems="stretch" spacing="md">
        <div className="demo-wrap">
            <h2>x 轴滚动</h2>
            <p>
                不建议用来 x 轴滚动，flex 布局右侧 padding 会消失，span 宽度会失效（x 轴滚动宽度未知）, spacing
                负间距会撑开，套用容器会导致宽度丢失等各种问题
            </p>
        </div>
        <div className="demo-wrap">
            <h2>
                y 轴滚动 - 由于使用 spacing 时为了清除间距使用了负的 margin，所以在外层需要添加滚动时注意使用
                cleanMargin 来清除（会创建一个额外的容器）
            </h2>
            <div style={{ overflow: 'auto', height: 300, padding: 10, background: 'gray' }}>
                <Box spacing="lg" container cleanMargin>
                    <Box span={4}>
                        <Box direction="column" spacing="lg">
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-1</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-2</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-3</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-4</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 1-5</div>
                                </Card.Content>
                            </Card>
                        </Box>
                    </Box>
                    <Box span={8}>
                        <Box direction="column" spacing="lg">
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 100 }}>Card 2-1</div>
                                </Card.Content>
                            </Card>
                            <Card>
                                <Card.Content>
                                    <div style={{ height: 800 }}>Card 2-2</div>
                                </Card.Content>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    </Box>
);
// demo end

export default Demo;
