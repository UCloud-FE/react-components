import config from 'src/config';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-menu';

export default ({ colorMap, colorList }) => ({
    themeType: {
        light: {
            '&': {
                [`&, .${prefixCls}-popup-content-wrap`]: {
                    color: colorList.black,
                    background: colorMap.default.background
                },
                [`.${prefixCls}-item, .${prefixCls}-submenu-title-content, .${prefixCls}-selectall-checkbox`]: {
                    ':hover': {
                        background: colorMap.active.background
                    }
                },
                [`.${prefixCls}-item-selected, .${prefixCls}-submenu-title-selected, .${prefixCls}-selectall-checkbox-checked`]: {
                    color: colorMap.active.text
                },
                [`.${prefixCls}-submenu-title-content-collapse`]: {
                    borderColor: colorMap.default.border
                }
            }
        },
        dark: {
            '&': {
                [`&, .${prefixCls}-popup-content-wrap`]: {
                    color: 'rgba(255, 255, 255, 0.65)',
                    background: '#001529'
                },
                [`.${prefixCls}-item, .${prefixCls}-submenu-title-content, .${prefixCls}-selectall-checkbox`]: {
                    ':hover': {
                        background: '#1890ff',
                        color: 'white'
                    }
                },
                [`.${prefixCls}-item-selected, .${prefixCls}-submenu-title-selected, .${prefixCls}-selectall-checkbox-checked`]: {
                    color: 'white'
                },
                [`.${prefixCls}-submenu-title-content-collapse`]: {
                    borderColor: '#163255'
                }
            }
        }
    }
});
