import styled from '@emotion/styled';

import Button from 'src/components/Button';
import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-table';
export const wrapperCls = prefixCls + '-wrapper';

export const ActionButton = styled(Button)`
    margin-right: 4px;
`;
