import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ThemeProvider } from 'styled-components';

import Popover from 'components/Popover';
import { getPlacements } from 'components/Popover/placements';

import { TooltipWrap, themeMap, Arrow, ArrowInner, ContentWrap } from './style';

const { Animation, Trigger, Placement } = Popover;
const placements = getPlacements(7);
const Theme = ['light', 'dark'];

class Tooltip extends Component {
    static propTypes = {
        /** @ignore */
        popup: PropTypes.node.isRequired,
        /** @ignore */
        placement: PropTypes.oneOf(Placement),
        /** 主题风格 */
        theme: PropTypes.oneOfType([PropTypes.oneOf(Theme), PropTypes.object])
    };
    static defaultProps = {
        theme: 'light',
        placement: Placement[0]
    };
    renderPopup() {
        const { popup, placement, theme } = this.props;
        return (
            <ThemeProvider theme={_.isString(theme) ? themeMap[theme] : theme}>
                <TooltipWrap placement={placement}>
                    <Arrow>
                        <ArrowInner />
                    </Arrow>
                    <ContentWrap>{popup}</ContentWrap>
                </TooltipWrap>
            </ThemeProvider>
        );
    }
    render() {
        // eslint-disable-next-line no-unused-vars
        const { popup, ...rest } = this.props;
        return (
            <Popover
                getPopupContainer={triggerNode => triggerNode.parentNode}
                {...rest}
                builtinPlacements={placements}
                popup={this.renderPopup()}
            />
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
