import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Notice from 'src/components/Notice';
import Icon from 'src/components/Icon';
import withProps from 'src/utils/withProps';

const disabledMixin = css`
    pointer-events: none;
`;

export const SelectorWrap = withProps()(
    styled('div')(props => {
        const { disabled } = props;

        return css`
            display: inline-block;
            cursor: pointer;

            ${disabled && disabledMixin};
        `;
    })
);
export const TipWrap = styled('span')`
    margin-left: 5px;
`;

export const ListWrap = withProps()(
    styled('div')(props => {
        const {
            theme: { colorMap }
        } = props;

        return css`
            max-height: 200px;
            overflow: auto;
            border: 1px solid ${colorMap.default.border};
            margin-top: 6px;
        `;
    })
);

export const UploadIcon = styled(Icon)`
    vertical-align: baseline;
    margin-left: 5px;
    cursor: pointer;
`;

export const UploadNotice = styled(withProps({}, { cleanProps: ['onPreview'] })(Notice))(props => {
    const { onPreview } = props;

    return css`
        border: none;
        ${onPreview &&
        css`
            cursor: pointer;
        `};
    `;
});
