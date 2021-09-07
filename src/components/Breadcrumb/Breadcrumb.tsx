import React, { HTMLAttributes, ReactNode } from 'react';

import { SeparatorWrap, BreadcrumbWrap } from './style';
import { tuple } from 'src/type';

export const StyleTypes = tuple('block-hover', 'hover', 'active');
export type StyleType = typeof StyleTypes[number];

export interface BreadcrumbProps {
    /** 自定义分隔符 */
    separator?: ReactNode;
    /** 展示项激活样式的方式 */
    styleType?: StyleType;
}

const Breadcrumb = ({
    separator = '/',
    styleType = 'block-hover',
    children,
    ...rest
}: BreadcrumbProps & HTMLAttributes<HTMLElement>) => {
    let isFirstItem: boolean;
    return (
        <BreadcrumbWrap styleType={styleType} {...rest}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && (child.type as any).__IS_BREADCRUMB_ITEM) {
                    isFirstItem = isFirstItem === undefined ? true : false;
                    if (!isFirstItem) {
                        return [<SeparatorWrap key="separator">{separator}</SeparatorWrap>, child];
                    }
                }
                return child;
            })}
        </BreadcrumbWrap>
    );
};

export default Breadcrumb;
