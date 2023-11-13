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
                    label: 'small小标题',
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
                    label: '一级小标题，filterSmallType为true',
                    labelType: 'small',
                    filterSmallType: true,
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '21',
                            label: '2级菜单1,filterSmallType为true',
                            path: '/cloud-fe/resource/resourceset',
                            filterSmallType: true,
                            children: [
                                {
                                    hidden: false,
                                    icon: <SvgIcon type="cog" />,
                                    key: '321',
                                    label: '3级菜单1',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    hidden: false,
                                    icon: <SvgIcon type="cog" />,
                                    key: '322',
                                    label: '3级菜单2 ',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        },
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '22',
                            label: '2级菜单2 ',
                            path: '/cloud-fe/resource/resourceset',
                            children: [
                                {
                                    hidden: false,
                                    icon: <SvgIcon type="calendar" />,
                                    key: '31',
                                    label: '3级菜单1',
                                    path: '/cloud-fe/resource/resourceset'
                                },
                                {
                                    hidden: false,
                                    icon: <SvgIcon type="calendar" />,
                                    key: '32',
                                    label: '3级菜单2 ',
                                    path: '/cloud-fe/resource/resourceset'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '417',
                    label: '一级标题',
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '4166',
                            label: '二级资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                },
                {
                    icon: <SvgIcon type="calendar" />,
                    key: '416',
                    label: '一级标题，filterSmallType为true',
                    filterSmallType: true,
                    children: [
                        {
                            hidden: false,
                            icon: <SvgIcon type="calendar" />,
                            key: '4641',
                            label: '二级资源管理',
                            path: '/cloud-fe/resource/resourceset'
                        }
                    ]
                }
            ]}
        />
    </div>
);
// demo end

export default Demo;
