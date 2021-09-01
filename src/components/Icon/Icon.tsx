import React, { HTMLAttributes, useContext, useMemo } from 'react';
import classnames from 'classnames';

import { Override } from 'src/type';
import ConfigContext from 'src/components/ConfigProvider/ConfigContext';

import { IconWrap, prefixCls } from './style';

export interface IconProps {
    /** 图标类型 */
    type: string;
    /** 是否旋转 */
    spin?: boolean;
    /** 自定义 icon 类名前缀，使用自定义图标库时使用，默认为 icon\_\_ */
    prefix?: string;
}

/** 图标控件 */
const Icon = ({
    type,
    spin,
    prefix,
    className,
    ...rest
}: IconProps & Override<HTMLAttributes<HTMLElement>, IconProps>) => {
    const configContext = useContext(ConfigContext);
    const finalPrefix = useMemo(() => prefix || configContext.iconDefaultPrefix || 'icon__', [
        configContext.iconDefaultPrefix,
        prefix
    ]);
    return (
        <IconWrap
            className={classnames(prefixCls, `${finalPrefix}${type}`, spin && `${prefixCls}-spin`, className)}
            spin={spin}
            {...rest}
        />
    );
};

export default React.memo(Icon);
