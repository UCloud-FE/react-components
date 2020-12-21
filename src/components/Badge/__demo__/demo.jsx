import React from 'react';

import Badge from 'src/components/Badge';
import Combine from 'src/components/Combine';
import demoUtil from 'tests/shared/demoUtil';

// demo start
const { DemoWrap, DemoBlock } = demoUtil;
const Content = () => <div style={{ width: '50px', height: '50px', borderRadius: '5px', background: '#ccc' }}></div>;
const Demo = () => (
    <>
        <DemoWrap title="数值提示">
            <DemoBlock>
                <Badge value={1}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={10}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={99}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={9999}>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge value={9999} maxValue={100000}>
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="文本提示">
            <DemoBlock row lg>
                <Badge value="New">
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock row lg>
                <Badge value="很长的提示内容很长的提示内容很长的提示内容很长的提示内容很长的提示内容很长的提示内容">
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock row lg>
                <Badge
                    value={
                        <div>
                            <p>自定义一堆提示内容。 </p>
                            <p>自定义一堆提示内容。</p>
                        </div>
                    }
                >
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="状态点">
            <DemoBlock>
                <Badge dot>
                    <Content />
                </Badge>
            </DemoBlock>
            <DemoBlock>
                <Badge dot color="primary">
                    <Content />
                </Badge>
            </DemoBlock>
        </DemoWrap>
        <DemoWrap title="作为标记使用">
            <DemoBlock row>
                <Combine>
                    <span>文字描述</span>
                    <Badge value="New" color="yellow" />
                </Combine>
            </DemoBlock>
            <DemoBlock row>
                <Combine>
                    <span>文字描述</span>
                    <Badge dot color="green" />
                </Combine>
            </DemoBlock>
        </DemoWrap>
    </>
);
// demo end

export default Demo;
