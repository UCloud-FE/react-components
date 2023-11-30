import React from 'react';
import Nav from 'src/components/Nav';
import SvgIcon from 'src/components/SvgIcon';

// demo start

const Demo = () => {
    const [openKeys, setOpenKeys] = React.useState(['410', '411']);
    const [selectedKeys, setSelectedKeys] = React.useState(['4131']);
    console.log('openKyes: ', openKeys);
    console.log('selectedKeys: ', selectedKeys);

    return (
        <div style={{ width: 240 }}>
            <Nav
                onOpenChange={keys => {
                    setOpenKeys(keys);
                }}
                openKeys={openKeys}
                defaultOpenKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
                items={[
                    {
                        icon: <SvgIcon type="calendar" />,
                        key: '410',
                        label: '一级分类小标题',
                        labelType: 'small',
                        children: [
                            {
                                icon: <SvgIcon type="calendar" />,
                                key: '411',
                                label: '二级标题',
                                path: '/cloud-fe/resource/resourceset',
                                redirect: '',
                                children: [
                                    {
                                        icon: <SvgIcon type="calendar" />,
                                        key: '4131',
                                        label: '资源管理sub',
                                        path: '/cloud-fe/resource/resourceset',
                                        redirect: ''
                                    }
                                ]
                            }
                        ]
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
                    }
                ]}
            />
        </div>
    );
};
// demo end

export default Demo;
