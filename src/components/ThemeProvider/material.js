import { generateTheme, extend } from './theme';
import config from 'src/config';

const { prefixCls } = config;

const defaultMaterialVars = {
    primaryBoxShadow:
        '0 1px 5px 0 rgba(21,56,195,.12), 0 2px 2px 0 rgba(8, 155, 140, 0.24), 0 3px 1px -3px rgba(58, 96, 245,.34)',
    primaryBoxShadowActive:
        '0 1px 10px 0 rgba(21,56,195,.12), 0 2px 4px -1px rgba(21,56,195,.2), 0 4px 5px 0 rgba(21,56,195,.14)',
    whiteBoxShadow:
        '0 -1px 0 0 rgba(223, 224, 241, 0.5), 0 1px 0 0 rgba(223,224,241,.3), 0 1px 1px 0 rgba(162,166,191,.5), 0 2px 4px 0 rgba(228,229,242,.6)',
    whiteBoxShadowActive:
        '0 1px 10px 0 rgba(162,166,191,.12), 0 2px 4px -1px rgba(162,166,191,.2), 0 4px 5px 0 rgba(162,166,191,.14)',
    innerShadow: 'inset 0 1px 3px 0 #dedeef, inset 0 0px 2px 0 #f6f6fb',
    primaryLinearGradient: 'linear-gradient(135deg,#5c8af7,#385ef5)',
    primaryLinearGradientActive: 'linear-gradient(135deg,#5e95fb,#3a72f9)',
    transitionUp: '.22s cubic-bezier(.4,0,.2,1)',
    transitionDown: '.18s cubic-bezier(.4,0,.2,1)',
    transitionFlat: '.16s cubic-bezier(.4,0,.2,1)'
};

export default originTheme => {
    const theme = generateTheme(originTheme);
    let { colorList, colorMap, materialVars } = theme;
    materialVars = { ...defaultMaterialVars, ...materialVars };

    const materialTheme = {};
    materialTheme['Input'] = {
        '&': {
            input: {
                boxShadow: materialVars.innerShadow,
                transition: materialVars.transitionDown,
                borderColor: '#dfe0f1',
                backgroundColor: '#fafafc',
                ':hover': {
                    borderColor: '#c3cad9',
                    backgroundColor: '#f6f6fb'
                },
                ':focus': {
                    borderColor: colorMap.active.border,
                    backgroundColor: '#f6f6fb'
                },
                ':disabled,&[disabled]': {
                    boxShadow: 'none'
                }
            }
        }
    };
    materialTheme['Card'] = {
        '&': {
            borderColor: 'transparent',
            boxShadow:
                '0px 1px 0px 0px rgba(223,224,241,1), 0px 1px 3px 0px rgba(182,188,224,0.5), 0px 4px 12px 0px rgba(218,221,238,0.5)'
        },
        Header: {
            padding: '0 24px',
            marginTop: '14px'
        },
        Action: {
            padding: '0 24px',
            marginTop: '14px'
        },
        Footer: {
            padding: '0 24px',
            marginTop: '14px',
            paddingTop: '14px'
        },
        Content: {
            padding: '0 24px',
            marginTop: '14px'
        }
    };
    const menuPrefixCls = prefixCls + '-menu';
    materialTheme['Menu'] = {
        '&': {
            [`&, .${menuPrefixCls}-popup-content-wrap`]: {
                borderStyle: 'none',
                boxShadow: materialVars.whiteBoxShadow
            }
        },
        Item: {
            borderRadius: '2px'
        },
        SubMenuTitle: {
            borderRadius: '2px'
        },
        SelectAllCheckbox: {
            borderRadius: '2px'
        }
    };
    materialTheme['Select'] = {
        Selector: {
            borderStyle: 'none',
            boxShadow: materialVars.whiteBoxShadow,
            transition: `all ${materialVars.transitionUp}`,
            ':hover': {
                boxShadow: materialVars.whiteBoxShadowActive
            },
            ':disabled,&[disabled]': {
                boxShadow: 'none',
                borderStyle: 'solid'
            }
        },
        MenuWrap: {
            borderStyle: 'none',
            boxShadow: materialVars.whiteBoxShadowActive,
            borderRadius: '2px'
        },
        Menu: {
            boxShadow: 'none'
        }
    };
    const buttonPrefixCls = prefixCls + '-button';
    materialTheme['Button'] = {
        styleType: {
            primary: {
                border: 'none',
                background: materialVars.primaryLinearGradient,
                boxShadow: materialVars.primaryBoxShadow,
                transition: `all ${materialVars.transitionUp}`,
                ':hover': {
                    background: materialVars.primaryLinearGradientActive,
                    boxShadow: materialVars.primaryBoxShadowActive
                }
            },
            border: {
                border: 'none',
                boxShadow: materialVars.whiteBoxShadow,
                transition: `all ${materialVars.transitionUp}`,
                ':hover': {
                    boxShadow: materialVars.whiteBoxShadowActive
                }
            },
            'border-gray': {
                transition: `all ${materialVars.transitionFlat}`,
                background: '#fafafc',
                [`:hover,&.${buttonPrefixCls}-checked`]: {
                    background: '#fff',
                    color: colorList.primary,
                    borderColor: colorList.primary
                }
            }
        },
        '&': {
            ':disabled,&[disabled]': {
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: 'none'
            }
        }
    };
    const numberInputPrefixCls = `${prefixCls}-numberinput`;
    materialTheme['NumberInput'] = {
        '&': {
            [`&.${numberInputPrefixCls}-styletype-default`]: {
                borderColor: '#dfe0f1',
                borderRightWidth: '0',
                transition: materialVars.transitionDown,
                ':hover': {
                    borderColor: '#c3cad9'
                },
                [`&.${numberInputPrefixCls}-focused`]: {
                    borderColor: colorMap.active.border,
                    [`.${numberInputPrefixCls}-input-wrap`]: {
                        backgroundColor: '#f6f6fb'
                    }
                },
                [`.${numberInputPrefixCls}-handler`]: {
                    boxSizing: 'content-box',
                    borderRadius: '0'
                },
                [`.${numberInputPrefixCls}-handler-up`]: {
                    top: '-1px',
                    paddingTop: '1px'
                },
                [`.${numberInputPrefixCls}-handler-down`]: {
                    borderTopWidth: '1px',
                    borderTopColor: '#e8e9f5'
                },
                [`.${numberInputPrefixCls}-input-wrap`]: {
                    boxShadow: materialVars.innerShadow,
                    background: '#fafafc',
                    ':hover': {
                        backgroundColor: '#f6f6fb'
                    }
                },
                [`.${numberInputPrefixCls}-input`]: {
                    boxShadow: 'none',
                    background: 'transparent'
                },
                [`&.${numberInputPrefixCls}-disabled`]: {
                    [`.${numberInputPrefixCls}-input-wrap`]: {
                        boxShadow: 'none'
                    }
                }
            },
            [`&.${numberInputPrefixCls}-styletype-split`]: {
                [`.${numberInputPrefixCls}-input-wrap`]: {
                    boxShadow: materialVars.innerShadow,
                    background: '#fafafc',
                    borderColor: '#dfe0f1',
                    transition: materialVars.transitionDown,
                    margin: 0,
                    ':hover': {
                        borderColor: '#c3cad9',
                        backgroundColor: '#f6f6fb'
                    }
                },
                [`.${numberInputPrefixCls}-input`]: {
                    boxShadow: 'none',
                    background: 'transparent'
                },
                [`.${numberInputPrefixCls}-handler`]: {
                    borderColor: 'transparent'
                },
                [`&.${numberInputPrefixCls}-focused`]: {
                    [`.${numberInputPrefixCls}-input-wrap`]: {
                        backgroundColor: '#f6f6fb',
                        borderColor: colorMap.active.border
                    }
                },
                [`&.${numberInputPrefixCls}-disabled`]: {
                    [`.${numberInputPrefixCls}-input-wrap`]: {
                        boxShadow: 'none'
                    }
                }
            },
            [`&.${numberInputPrefixCls}-styletype-pagination`]: {
                [`.${numberInputPrefixCls}-input`]: {
                    boxShadow: materialVars.innerShadow,
                    transition: materialVars.transitionDown,
                    backgroundColor: '#fafafc',
                    borderColor: '#dfe0f1',
                    ':hover': {
                        backgroundColor: '#f6f6fb',
                        borderColor: '#c3cad9'
                    },
                    ':focus': {
                        backgroundColor: '#f6f6fb',
                        borderColor: colorMap.active.border
                    },
                    ':disabled,&[disabled]': {
                        boxShadow: 'none'
                    }
                },
                [`.${numberInputPrefixCls}-handler`]: {
                    borderColor: 'transparent'
                }
            },
            [`.${numberInputPrefixCls}-handler`]: {
                boxShadow: '0 2px 4px 0 #e4e5f2, 0 1px 1px 0 rgba(162,166,191,.32), 0 1px 0 0 rgba(223,224,241,.7)'
            }
        }
    };

    const datePickerPrefixCls = `${prefixCls}-datepicker`;
    materialTheme['DatePicker'] = {
        '&': {
            [`.${datePickerPrefixCls}-date-wrap`]: {
                boxShadow: materialVars.whiteBoxShadow,
                borderWidth: 0,
                paddingTop: '1px',
                paddingBottom: '1px'
            },
            [`&.${datePickerPrefixCls}-disabled .${datePickerPrefixCls}-date-wrap`]: {
                boxShadow: 'none',
                borderWidth: '1px'
            }
        },
        Range: {
            [`.${datePickerPrefixCls}-range-date-wrap`]: {
                borderWidth: 0,
                boxShadow: materialVars.whiteBoxShadow,
                ':hover': {
                    boxShadow: materialVars.whiteBoxShadowActive
                }
            },
            [`.${datePickerPrefixCls}-range-date-wrap-readonly`]: {
                boxShadow: 'none'
            },
            [`.${datePickerPrefixCls}-range-date-wrap-disabled`]: {
                borderWidth: '1px',
                boxShadow: 'none'
            }
        },
        RangePopup: {
            boxShadow: materialVars.whiteBoxShadowActive,
            borderWidth: 0
        }
    };
    const calendarPrefixCls = `${prefixCls}-calendar`;
    materialTheme['Calendar'] = {
        '&': {
            [`.${calendarPrefixCls}-header,
            .${calendarPrefixCls}-month-panel-header,
            .${calendarPrefixCls}-year-panel-header,
            .${calendarPrefixCls}-decade-panel-header`]: {
                background: colorList.primary
            },
            [`.${calendarPrefixCls}-selected-date .${calendarPrefixCls}-date,
            .${calendarPrefixCls}-month-panel-selected-cell .${calendarPrefixCls}-month-panel-month,
            .${calendarPrefixCls}-year-panel-selected-cell .${calendarPrefixCls}-year-panel-year,
            .${calendarPrefixCls}-decade-panel-selected-cell .${calendarPrefixCls}-decade-panel-decade`]: {
                background: colorList.primary
            },
            [`.${calendarPrefixCls}-cell .${calendarPrefixCls}-date,
            .${calendarPrefixCls}-month-panel-cell .${calendarPrefixCls}-month-panel-month,
            .${calendarPrefixCls}-year-panel-cell .${calendarPrefixCls}-year-panel-year,
            .${calendarPrefixCls}-decade-panel-cell .${calendarPrefixCls}-decade-panel-decade`]: {
                borderRadius: '2px'
            }
        }
    };
    const tabsPrefixCls = `${prefixCls}-tabs`;
    materialTheme['Tabs'] = {
        '&': {
            [`&.${tabsPrefixCls}-styletype-ink.${tabsPrefixCls}-top,
            &.${tabsPrefixCls}-styletype-ink.${tabsPrefixCls}-bottom`]: {
                [`.${tabsPrefixCls}-tab+.${tabsPrefixCls}-tab`]: {
                    marginLeft: '12px'
                }
            },
            [`&.${tabsPrefixCls}-styletype-ink.${tabsPrefixCls}-left,
            &.${tabsPrefixCls}-styletype-ink.${tabsPrefixCls}-right`]: {
                [`.${tabsPrefixCls}-tab+.${tabsPrefixCls}-tab`]: {
                    marginTop: '6px'
                }
            }
        }
    };
    return extend(extend(theme, materialTheme), originTheme);
};
