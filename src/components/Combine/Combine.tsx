import React, { ReactNode } from 'react';
import classnames from 'classnames';

import { itemCls, separatorCls, CombineWrap } from './style';

const Combine = ({
    children,
    sharedProps = {},
    spacing = 'smart',
    separator,
    ...rest
}: {
    children: ReactNode;
    sharedProps?: {
        size?: 'sm' | 'md' | 'lg';
        className?: string;
        [key: string]: unknown;
    };
    spacing?: 'compact' | 'smart' | 'sm' | 'md' | 'lg' | string;
    separator?: ReactNode;
}) => {
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
