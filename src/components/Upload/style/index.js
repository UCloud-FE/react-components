import styled, { css } from 'styled-components';

import { Color } from 'src/style';
import Notice from 'components/Notice';
import Icon from 'components/Icon';

const disabledMixin = css`
    pointer-events: none;
`;

export const SelectorWrap = styled.div`
    display: inline-block;
    cursor: pointer;

    ${({ disabled }) => disabled && disabledMixin};
`;
export const TipWrap = styled.span`
    margin-left: 5px;
`;

export const ListWrap = styled.div`
    max-height: 200px;
    overflow: auto;
    border: 1px solid ${Color.border.default};
    margin-top: 6px;
`;

export const UploadIcon = styled(Icon)`
    vertical-align: baseline;
    margin-left: 5px;
    cursor: pointer;
`;

export const UploadNotice = styled(Notice)`
    border: none;
    ${({ onPreview }) =>
        onPreview &&
        css`
            cursor: pointer;
        `};
`;
