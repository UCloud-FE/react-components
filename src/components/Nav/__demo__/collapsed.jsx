import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const Demo = () => (
    <div style={{ width: 'fit-content' }}>
        <Nav
            inlineCollapsed={true}
            items={[
                {
                    key: '410',
                    label: '小标题无icon',
                    labelType: 'small',
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '411',
                            label: '一级菜单',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: '',
                            children: [
                                {
                                    hidden: false,
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
                    icon: <SvgIcon type="cog" />,
                    key: '2',
                    label: '小标题有icon',
                    labelType: 'small',
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '21',
                            label: '2级菜单',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '419',
                    label: '无子菜单菜单项'
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '418',
                    label: '一级标题',
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '413',
                            label: '资源管理small',
                            path: '/cloud-fe/resource/resourceset',
                            labelType: 'small',
                            redirect: '',
                            children: [
                                {
                                    hidden: false,
                                    key: '412df',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                },
                                {
                                    hidden: false,
                                    key: '412222df',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    hidden: false,
                                    key: '4122211',
                                    label: 'cahidjailj',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                },
                                {
                                    hidden: false,
                                    key: '412222222',
                                    label: '32',
                                    path: '/cloud-fe/resource/resourceset',
                                    redirect: ''
                                }
                            ],
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '41222',
                            label: '资源管理222',
                            path: '/cloud-fe/resource/resourceset',
                            redirect: ''
                        }
                    ]
                },
                {
                    key: '417',
                    label: '一级标题无icon',
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '二级资源管理',
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
                            hidden: false,
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
