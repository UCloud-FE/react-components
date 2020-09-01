import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from 'src/config';
import addDefaultThemeProps from 'src/components/ThemeProvider/addDefaultThemeProps';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-transfer-table';

export const tableWrapCls = prefixCls + '-table-wrap';
