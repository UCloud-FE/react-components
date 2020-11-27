import styled from '@emotion/styled';
import { css } from '@emotion/core';

import withProps from 'src/utils/withProps';
import config from 'src/config';
import { clearFixMixin } from 'src/style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-upload';

// selector
export const selectorCls = prefixCls + '-selector';

// list
export const listCls = prefixCls + '-list';
export const cardListCls = listCls + '-card-list';
export const listWrapCls = listCls + '-wrap';
export const errorCls = prefixCls + '-error';
export const itemCls = prefixCls + '-item';
export const itemErrorCls = itemCls + '-error';
export const previewAbleCls = itemCls + '-preview-able';
export const nameCls = prefixCls + '-name';
export const progressCls = prefixCls + '-progress';
export const progressWrapCls = progressCls + '-wrap';
export const detailCls = prefixCls + '-detail';
export const actionCls = prefixCls + '-action';
export const actionIconCls = actionCls + '-icon';
export const removeCls = prefixCls + '-remove';
export const thumbnailCls = prefixCls + '-thumbnail';
export const fullThumbnailCls = thumbnailCls + '-full';
export const errorIconCls = errorCls + '-icon';
export const uploadingTipCLs = prefixCls + '-uploading-tip';
export const uploadingIconCLs = uploadingTipCLs + '-icon';
export const imageCls = prefixCls + '-image';
export const menuCls = prefixCls + '-menu';
export const separatorCls = prefixCls + '-separator';

// icons
export const iconCls = prefixCls + '-icon';
export const archiveIconCls = iconCls + '-archive';
export const docsIconCls = iconCls + '-docs';
export const imageIconCls = iconCls + '-image';
export const textIconCls = iconCls + '-text';
export const pdfIconCls = iconCls + '-pdf';
export const unknownIconCls = iconCls + '-unknown';
export const iconWrapCls = iconCls + '-wrap';
export const tipCls = prefixCls + '-tip';

// dropzone
export const dropzoneCls = prefixCls + '-dropzone';
export const dragingCls = prefixCls + '-draging';
export const dropzoneTipCls = dropzoneCls + '-tip';
export const dropzoneMaskTipCls = dropzoneCls + '-tip-mask';
export const dropzoneTipMainCls = dropzoneTipCls + '-main';
export const dropzoneTipSubCls = dropzoneTipCls + '-sub';

export const UploadWrap = withProps({
    className: prefixCls
})(
    styled('div')`
        .${selectorCls} + .${listWrapCls}, .${selectorCls} + .${dropzoneCls} {
            margin-top: 12px;
        }
    `
);

export const SelectorWrap = withProps({
    className: selectorCls
})(
    styled('div')(props => {
        const {
            disabled,
            theme: { designTokens: DT }
        } = props;

        return css`
            display: inline-block;
            cursor: pointer;

            ${disabled &&
            css`
                pointer-events: none;
            `};

            .${tipCls} {
                margin-left: 5px;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
            }
        `;
    })
);

export const ListWrap = withProps({
    className: listWrapCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            customStyle = {}
        } = props;

        return css`
            max-height: ${customStyle.listMaxHeight || '240px'};
            overflow: auto;
            > div {
                overflow: hidden;
            }

            .${listCls} {
                box-sizing: border-box;
                background: ${DT.T_COLOR_BG_DEFAULT_DARK};
                padding: 4px 16px;

                .${itemCls} {
                    display: table;
                    table-layout: fixed;
                    width: 100%;
                    border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    line-height: 20px;
                    padding: 8px 0;
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

                    &:last-of-type {
                        border-bottom: none;
                    }

                    .${thumbnailCls} {
                        display: table-cell;
                        padding: 4px 16px 4px 0;
                    }
                    .${detailCls} {
                        display: table-cell;
                        vertical-align: middle;
                    }
                    .${actionCls} {
                        display: table-cell;
                        padding-left: 8px;
                        width: 100px;
                        white-space: nowrap;
                        text-align: right;
                        vertical-align: middle;
                    }
                    .${removeCls} {
                        cursor: pointer;
                        margin-left: 12px;
                        fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                    }
                    &.${previewAbleCls} {
                        :hover {
                            .${detailCls} {
                                cursor: pointer;
                                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                            }
                        }
                    }
                    &.${itemErrorCls}.${itemErrorCls}.${itemErrorCls} {
                        .${detailCls} {
                            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                        }
                        .${iconWrapCls} {
                            background: ${DT.T_COLOR_BG_ERROR_DARK};
                            border: none;
                            .${iconCls} {
                                fill: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
                            }
                        }
                    }
                    .${errorCls} {
                        margin-top: 4px;
                    }
                    .${errorIconCls} {
                        fill: ${DT.T_COLOR_TEXT_ERROR};
                        margin-right: 4px;
                        vertical-align: middle;
                    }
                    .${uploadingTipCLs} {
                        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
                    }
                    .${uploadingIconCLs} {
                        fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
                        margin-right: 4px;
                        vertical-align: middle;
                    }
                }
            }

            .${cardListCls} {
                margin-right: -16px;
                margin-bottom: -16px;
                overflow: hidden;
                ${clearFixMixin};

                .${itemCls} {
                    box-sizing: border-box;
                    position: relative;
                    width: 140px;
                    height: 140px;
                    float: left;
                    margin-right: 16px;
                    margin-bottom: 16px;
                    border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    border-radius: 4px;
                    background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};

                    .${thumbnailCls} {
                        display: block;
                        margin: 32px auto 24px auto;
                    }
                    .${nameCls} {
                        text-align: center;
                        padding: 0 12px;
                    }
                    .${progressWrapCls} {
                        padding: 0 18px;
                    }
                    .${errorCls} {
                        text-align: center;
                        padding: 0 12px;
                    }

                    &.${itemErrorCls}.${itemErrorCls}.${itemErrorCls} {
                        border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
                        background: ${DT.T_COLOR_BG_ERROR_LIGHT};
                    }

                    .${menuCls} {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
                        border-radius: 4px;
                        .${nameCls} {
                            color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                        .${actionCls} {
                            line-height: 24px;
                            margin: 40px auto 30px;
                            text-align: center;
                        }
                        .${actionIconCls} {
                            margin: 0 16px;
                            cursor: pointer;
                            fill: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                        .${actionIconCls} + .${actionIconCls} {
                            position: relative;
                        }
                        .${separatorCls} {
                            display: inline-block;
                            width: 1px;
                            height: 24px;
                            background: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                            vertical-align: middle;
                        }
                    }
                    :hover {
                        .${menuCls} {
                            display: block;
                        }
                    }
                    .${fullThumbnailCls} {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                    }
                }
            }
            .${errorCls} {
                color: ${DT.T_COLOR_TEXT_ERROR};
                line-height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .${progressWrapCls} {
                line-height: 20px;
                .${progressCls} {
                    display: inline-block;
                    width: 100%;
                    vertical-align: middle;
                }
            }

            .${nameCls} {
                display: block;
                line-height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .${thumbnailCls} {
                overflow: hidden;
                width: 38px;
                height: 38px;
                .${imageCls}, .${iconWrapCls} {
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                .${imageCls} {
                    background: white center center no-repeat;
                    background-size: cover;
                }
                .${iconWrapCls} {
                    line-height: 36px;
                    text-align: center;
                    border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
                }
            }

            .${imageIconCls} {
                fill: ${DT.T_COLOR_LEGEND_CYAN_5};
            }
            .${archiveIconCls} {
                fill: ${DT.T_COLOR_LEGEND_ORANGE_5};
            }
            .${docsIconCls} {
                fill: ${DT.T_COLOR_LEGEND_BLUE_5};
            }
            .${unknownIconCls} {
                fill: ${DT.T_COLOR_LEGEND_PURPLE_5};
            }
        `;
    })
);

export const DropZoneWrap = withProps({
    className: dropzoneCls
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            customStyle = {}
        } = props;

        return css`
            border: 1px dashed ${DT.T_COLOR_LINE_DEFAULT_DARK};
            border-radius: 4px;
            transition: 0.3s border-color;
            position: relative;
            background: ${DT.T_COLOR_BG_DEFAULT_DARK};

            .${listWrapCls} {
                min-height: 210px;
                max-height: ${customStyle.listMaxHeight || '300px'};
                overflow: auto;
            }
            .${cardListCls} {
                padding: 24px;
            }

            .${dropzoneTipCls} {
                box-sizing: border-box;
                height: 100%;
                padding: 40px 0;
                text-align: center;
                transition: 0.3s background-color;
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};

                .${iconCls} {
                    transition: 0.3s fill;
                    fill: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
                }
                .${dropzoneTipMainCls} {
                    line-height: 26px;
                    margin-bottom: 4px;
                    margin-top: 24px;
                    font-size: 18px;
                    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                    font-weight: bold;
                }
                .${dropzoneTipSubCls} {
                    line-height: 22px;
                    font-size: 14px;
                    color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                }
            }
            .${dropzoneMaskTipCls} {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                .${dropzoneTipCls} {
                    height: 100%;
                    box-sizing: border-box;
                    background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
                }
            }

            &.${dragingCls} {
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};

                .${dropzoneTipCls} {
                    background: ${DT.T_COLOR_BG_DEFAULT_DARK};
                    .${iconCls} {
                        fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                    }
                }
                .${dropzoneMaskTipCls} {
                    display: block;

                    .${dropzoneTipCls} {
                        background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
                        .${iconCls} {
                            fill: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                        .${dropzoneTipMainCls} {
                            color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                        .${dropzoneTipSubCls} {
                            color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
                        }
                    }
                }
            }
        `;
    })
);

export const ErrorTipWrap = styled.div`
    padding: 16px;
`;
