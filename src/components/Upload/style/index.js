import styled, { css } from 'styled-components';

import Notice from 'src/components/Notice';
import Icon from 'src/components/Icon';
import defaultTheme from 'src/components/ThemeProvider/theme';

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
    border: 1px solid ${({ theme: { colorMap } }) => colorMap.default.border};
    margin-top: 6px;
`;
ListWrap.defaultProps = {
    theme: defaultTheme
};

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
