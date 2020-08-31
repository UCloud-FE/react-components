import styled from "@emotion/styled";
import { css } from "@emotion/core";

import config from 'config';

import withProps from "src/utils/withProps";

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-combine';

export const controllerPrefix = prefixCls + '-controller';

const spacingMap = {
    compact: '-1px',
    sm: '8px',
    md: '12px',
    lg: '12px'
};

export const CombineWrap = styled(withProps({
    className: prefixCls
})(styled("div")(props => {
    const {
        spacing
    } = props;

    return css`
        position: relative;

        > .${controllerPrefix} {
            vertical-align: middle;
            display: inline-block;
        }
        > .${controllerPrefix}+.${controllerPrefix} {
            margin-left: ${spacingMap[spacing] || spacing};

            &:focus {
                z-index: 2;
            }
            &:hover {
                z-index: 3;
            }
        }
    `;
})))`
/* empty */
`;
