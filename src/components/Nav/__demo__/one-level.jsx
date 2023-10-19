import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const onClick = info => {
    console.log('click ', info);
};

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            onClick={onClick}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '一级正常标题'
                },
                {
                    icon: <SvgIcon type="cog" />,
                    key: '418',
                    label: '一级标题一级标题一级标题一级标题一级标题一级标题一级标题'
                },
                {
                    key: '417',
                    label: '一级正常标题无icon'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '一级小标题',
                    labelType: 'small'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    labelType: 'small',
                    label: '资源管理'
                }
            ]}
        />
    </div>
);
// demo end

export default Demo;
