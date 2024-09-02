const isProd = process.env.NODE_ENV === 'production';

module.exports = [
    {
        name: 'Base',
        sections: [
            {
                name: 'Icon'
            },
            ...(isProd
                ? []
                : [
                      {
                          name: 'SvgIcon'
                      }
                  ]),
            {
                name: 'Button'
            },
            {
                name: 'Link',
                components: ['Link', 'Button']
            }
        ]
    },
    {
        name: 'Layout',
        sections: [
            {
                name: 'Box'
            },
            {
                name: 'Grid',
                content: 'README.md',
                components: ['Row', 'Col']
            },
            {
                name: 'Combine'
            },
            { name: 'Layout', components: ['Layout', 'Sider'] }
        ]
    },
    {
        name: 'Interactive',
        sections: [
            {
                name: 'Input',
                components: ['Input', 'Search']
            },
            {
                name: 'NumberInput'
            },
            {
                name: 'Textarea'
            },
            {
                name: 'AutoComplete'
            },
            {
                name: 'Select',
                components: ['Select', 'Option', 'Extra', 'Group']
            },
            {
                name: 'Checkbox',
                components: ['Checkbox', 'Group']
            },
            {
                name: 'Radio',
                components: ['Radio', 'Group']
            },
            {
                name: 'Switch'
            },
            {
                name: 'Slider'
            },
            {
                name: 'Upload'
            },
            ...(isProd
                ? []
                : [
                      {
                          name: 'Calendar'
                      }
                  ]),
            {
                name: 'DatePicker',
                components: ['DatePicker', 'Month', 'Range']
            },
            {
                name: 'TimePicker'
            },
            {
                name: 'Menu',
                components: ['Menu', 'SubMenu', 'Item']
            },
            {
                name: 'Tree'
            },
            {
                name: 'Cascader'
            },
            {
                name: 'ActionList'
            },
            {
                name: 'ZForm'
            },
            {
                name: 'Transfer'
            },
            {
                name: 'TransferMenu'
            },
            {
                name: 'TransferTable'
            },
            {
                name: 'EditableTable'
            },
            {
                name: 'EditableList'
            },
            {
                name: 'Nav',
                components: ['Nav']
            }
        ]
    },
    {
        name: 'Display',
        sections: [
            {
                name: 'Notice'
            },
            {
                name: 'Badge',
                components: ['Badge', 'Bubble']
            },
            {
                name: 'Tag',
                components: ['Tag', 'Icon', 'Group']
            },
            {
                name: 'Popover'
            },
            {
                name: 'Tooltip'
            },
            {
                name: 'PopConfirm'
            },
            {
                name: 'Modal',
                components: ['Modal', 'Content']
            },
            {
                name: 'Drawer'
            },
            {
                name: 'List',
                components: ['ConfigInfo', 'Content', 'Hovertip', 'Icontip', 'List']
            },
            {
                name: 'Table',
                components: [
                    'Table',
                    'ColumnConfigButton',
                    'SearchInput',
                    'ActionList',
                    'ResizableTH',
                    'HoverDisplayArea'
                ]
            },
            {
                name: 'Tabs',
                components: ['Tabs', 'Pane']
            },
            {
                name: 'Collapse',
                components: ['Collapse', 'Panel']
            },
            {
                name: 'Form',
                components: ['Form', 'Item', 'Group', 'SubArea']
            },
            {
                name: 'Card'
            },
            {
                name: 'Steps'
            },
            {
                name: 'Message'
            },
            {
                name: 'Breadcrumb',
                components: ['Breadcrumb', 'Item', 'BackButton']
            },
            {
                name: 'Pagination'
            },
            {
                name: 'Progress'
            },
            {
                name: 'Loading'
            },
            {
                name: 'Skeleton'
            }
        ]
    },
    {
        name: 'Other',
        sections: [
            {
                name: 'LocaleProvider'
            },
            {
                name: 'ThemeProvider'
            },
            {
                name: 'ConfigProvider'
            }
        ]
    }
];
