import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            TopExtraItem={<div style={{ height: 48, lineHeight: '48px', textAlign: 'center' }}> 切换应用区域 </div>}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '一级目录'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '一级目录333'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题44'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '资源管理44'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '415',
                    label: '资源管理'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '414',
                    label: '资源管理'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '413',
                    label: '资源管理'
                }
            ]}
        />
    </div>
);
// demo end

export default Demo;
