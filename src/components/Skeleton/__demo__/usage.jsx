import React from 'react';

import Skeleton from 'src/components/Skeleton';
import Card from 'src/components/Card';
import demoUtil from 'shared/demoUtil';

// demo start
const { DemoWrap } = demoUtil;
const Demo = () => (
    <>
        <h2>普通场景</h2>
        <DemoWrap>
            <Skeleton />
        </DemoWrap>

        <h2>带动画</h2>
        <DemoWrap>
            <Skeleton animated />
        </DemoWrap>

        <h2>多行</h2>
        <DemoWrap>
            <Skeleton rows={3} animated />
        </DemoWrap>

        <h2>组合</h2>
        <DemoWrap>
            <Card>
                <Card.Header>
                    <Skeleton animated width="60%" />
                </Card.Header>
                <Card.Content>
                    <Skeleton animated rows={3} />
                </Card.Content>
            </Card>
        </DemoWrap>
    </>
);
// demo end

export default Demo;
