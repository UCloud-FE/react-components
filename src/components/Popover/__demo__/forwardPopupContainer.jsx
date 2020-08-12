import React from 'react';

import Card from 'src/components/Card';
import Button from 'src/components/Button';
import Popover from 'src/components/Popover';

// demo start
const Demo1 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            默认容器为 body，可以显示，但滚动时由于容器和元素不在一个滚动层中，会导致偏移，体验较差
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <Popover
                popup={
                    <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>
                }
            >
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Popover>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo2 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            使用父容器作为容器，如果上层有定位容器，并再上层嵌套了滚动容器，会导致弹出层无法脱离，定位出现问题且滚动会闪烁
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <div style={{ position: 'relative' }}>
                <Popover
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    popup={
                        <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
                            This is the popup
                        </div>
                    }
                >
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Popover>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo3 = () => (
    <Card>
        <Card.Header comment="This is the comment">
            使用 forwardPopupContainer 可以比较方便的跳过组件内部的这类问题，Card、Table
            等组件内部都提供了比较安全的容器区域。
        </Card.Header>
        <Card.Action>
            <Button>This is a action button</Button>
            <Button>This is a action button</Button>
        </Card.Action>
        <Card.Content>
            <div style={{ position: 'relative' }}>
                <Popover
                    forwardPopupContainer
                    popup={
                        <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
                            This is the popup
                        </div>
                    }
                >
                    <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
                </Popover>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button style={{ float: 'right' }}>This is a footer button</Button>
        </Card.Footer>
    </Card>
);
const Demo4 = () => (
    <div>
        <h2>使用 function 的 forwardPopupContainer 来做容器的 fallback</h2>
        <div style={{ position: 'relative' }}>
            <Popover
                forwardPopupContainer={triggerNode => triggerNode.parentNode}
                popup={
                    <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>This is the popup</div>
                }
            >
                <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
            </Popover>
        </div>
    </div>
);

const Demo = () => (
    <div>
        <div className="demo-wrap">
            <Demo1 />
        </div>
        <div className="demo-wrap">
            <Demo2 />
        </div>
        <div className="demo-wrap">
            <Demo3 />
        </div>
        <div className="demo-wrap">
            <Demo4 />
        </div>
    </div>
);
// demo end

export default Demo;
