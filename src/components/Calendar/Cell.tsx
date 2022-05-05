import React, { HTMLAttributes } from 'react';
import { CellValue, Mode } from '@z-r/calendar';
import classNames from 'classnames';

import { cellContentCls, cellContentNextSpaceCls, cellContentPrevSpaceCls, prefixCls } from './style';

const Cell = ({
    children,
    mode,
    className,
    value,
    ...rest
}: HTMLAttributes<HTMLDivElement> & { mode: Mode; value?: CellValue<Mode> }) => {
    return (
        <div {...rest} className={classNames(className, prefixCls + `-cell-${mode}`)}>
            <span className={cellContentPrevSpaceCls} />
            <span className={cellContentCls}>{children}</span>
            <span className={cellContentNextSpaceCls} />
        </div>
    );
};

export default React.memo(Cell);
