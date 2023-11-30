import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const Demo = () => (
    <div style={{ width: 240 }}>
        <Nav
            mode="vertical"
            defaultSelectedKeys={['4131']}
            subMenuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click sub menu, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            menuItemRender={(props, dom) => {
                return (
                    <div
                        onClick={() => {
                            console.log('click menu item, props:', props);
                        }}
                    >
                        {dom}
                    </div>
                );
            }}
            items={[
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '410',
                    label: '小标题',
                    labelType: 'small',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '一级菜单',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: '',
                            children: [
                                {
                                    icon: <SvgIcon type="calendar" />,
                                    key: '4131',
                                    label: '资源管理',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '资源管33理'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        },
                        {
                            children: [
                                {
                                    key: '4122211',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                },
                                {
                                    key: '412222222',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                }
                            ],
                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '资源管理',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '资源管理',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '资源管理1',
                    children: [
                        {
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '资源管理2',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        }
                    ]
                }
            ]}
        />
    </div>
);
// demo end

export default Demo;
