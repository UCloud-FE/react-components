import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import { Override } from 'src/type';

import { itemCls, separatorCls, CombineWrap } from './style';

interface CombineProps {
    children: ReactNode;
    /** children 共享属性 */
    sharedProps?: {
        /** 尺寸 */
        size?: 'sm' | 'md' | 'lg';
        /** className */
        className?: string;
        [key: string]: unknown;
    };
    /** 间距 */
    spacing?: 'compact' | 'smart' | 'sm' | 'md' | 'lg' | string;
    /** 分隔符 */
    separator?: ReactNode;
}

const Combine = ({
    children,
    sharedProps = {},
    spacing = 'smart',
    separator,
    ...rest
}: CombineProps & Override<HTMLAttributes<HTMLDivElement>, CombineProps>) => {
    const { size = 'md' } = sharedProps;
    let isFirstItem: boolean;
    return (
        <CombineWrap spacing={spacing === 'smart' ? size : spacing} {...rest}>
            {React.Children.map(children, child => {
                if (child == null || child === false) return child;
                isFirstItem = isFirstItem === undefined ? true : false;
                const _child = (
                    <div className={itemCls}>
                        {React.isValidElement(child)
                            ? React.cloneElement(child, {
                                  ...sharedProps,
                                  className: classnames(child.props.className, sharedProps.className)
                              })
                            : child}
                    </div>
                );
                return separator && !isFirstItem
                    ? [
                          <span className={separatorCls} key="separator">
                              {separator}
                          </span>,
                          _child
                      ]
                    : _child;
            })}
        </CombineWrap>
    );
};

export default Combine;
