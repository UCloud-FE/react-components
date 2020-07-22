import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import Popover from 'src/components/Popover';
import { getPlacements } from 'src/components/Popover/placements';
import ThemeGetter from 'src/components/ThemeProvider/ThemeGetter';

import { TooltipWrap, Arrow, ArrowInner, ContentWrap, tooltipPopupClassName } from './style';

const { Animation, Trigger, Placement } = Popover;
const arrowPlacements = getPlacements(10);
const placements = getPlacements();
const Theme = ['light', 'dark'];

class Tooltip extends Component {
    static propTypes = {
        /** @ignore */
        popup: PropTypes.node.isRequired,
        /** @ignore */
        placement: PropTypes.oneOf(Placement),
        /** @ignore */
        popupClassName: PropTypes.string,
        /** 是否显示箭头 */
        arrow: PropTypes.bool,
        /** 主题风格 */
        theme: PropTypes.oneOfType([PropTypes.oneOf(Theme), PropTypes.object]),
        /** 自定义样式 */
        customStyle: PropTypes.shape({
            /** 弹出层外层 padding */
            popupWrapperPadding: PropTypes.string
        })
    };
    static defaultProps = {
        theme: 'light',
        arrow: true,
        placement: Placement[0],
        customStyle: {}
    };
    renderPopup(theme) {
        const { popup, placement, theme: themeType, arrow, customStyle } = this.props;
        const { popupWrapperPadding } = customStyle;
        return (
            <ThemeProvider theme={theme}>
                <TooltipWrap placement={placement} themeType={themeType}>
                    {arrow && (
                        <Arrow>
                            <ArrowInner />
                        </Arrow>
                    )}
                    <ContentWrap themeType={themeType} popupWrapperPadding={popupWrapperPadding}>
                        {popup}
                    </ContentWrap>
                </TooltipWrap>
            </ThemeProvider>
        );
    }
    render() {
        // eslint-disable-next-line no-unused-vars
        const { popup, theme: themeType, popupClassName = '', customStyle, arrow, ...rest } = this.props;
        return (
            <ThemeGetter>
                {theme => (
                    <Popover
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        {...rest}
                        popupClassName={`${tooltipPopupClassName} ${popupClassName}`}
                        builtinPlacements={arrow ? arrowPlacements : placements}
                        popup={this.renderPopup(theme)}
                    />
                )}
            </ThemeGetter>
        );
    }
}

Object.assign(Tooltip, {
    Animation,
    Trigger,
    Placement,
    Theme
});

export default Tooltip;
