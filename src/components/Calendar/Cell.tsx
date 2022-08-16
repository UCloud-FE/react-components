import React, { HTMLAttributes } from 'react';
import { CellValue, Mode } from '@ucloud-fe/calendar';
import classNames from 'classnames';

import useLocale from 'src/components/LocaleProvider/useLocale';

import LOCALE from './locale/zh_CN';
import {
    cellContentCls,
    cellContentNextSpaceCls,
    cellContentPrevSpaceCls,
    cellContentSquareCls,
    prefixCls
} from './style';

const Cell = ({
    children,
    mode,
    className,
    value,
    disabled,
    ...rest
}: HTMLAttributes<HTMLDivElement> & { mode: Mode; disabled?: boolean; value?: CellValue<Mode> }) => {
    const locale = useLocale(LOCALE, 'Calendar');
    return (
        <div
            {...rest}
            className={classNames(className, prefixCls + `-cell-${mode}`)}
            title={disabled ? locale.disabledTip : ''}
        >
            <span className={cellContentPrevSpaceCls} />
            <span className={cellContentCls}>
                <div className={cellContentSquareCls}>{children}</div>
            </span>
            <span className={cellContentNextSpaceCls} />
        </div>
    );
};

export default React.memo(Cell);
