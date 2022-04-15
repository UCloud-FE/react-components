import React, { HTMLAttributes } from 'react';
import { Mode } from '@z-r/calendar/types/interface';
import classNames from 'classnames';

import { cellContentCls, cellContentNextSpaceCls, cellContentPrevSpaceCls, prefixCls } from './style';

const Cell = ({ children, mode, className, ...rest }: HTMLAttributes<HTMLDivElement> & { mode: Mode }) => {
    return (
        <div {...rest} className={classNames(className, prefixCls + `-cell-${mode}`)}>
            <span className={cellContentPrevSpaceCls} />
            <span className={cellContentCls}>{children}</span>
            <span className={cellContentNextSpaceCls} />
        </div>
    );
};

export default React.memo(Cell);
