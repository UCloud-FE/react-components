import React, { ReactNode } from 'react';

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
                isFirstItem = isFirstItem === undefined ? true : false;
                const _child = (
                    <div className={itemCls}>
                        {React.isValidElement(child) ? React.cloneElement(child, { size }) : child}
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
