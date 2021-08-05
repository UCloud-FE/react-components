import React, { HTMLAttributes, ReactNode } from 'react';

import CheckboxIcon from 'src/components/Checkbox/CheckboxIcon';
import { Override } from 'src/type';

import { RadioCardWrap, cardHeaderCls, cardTitleCls, cardContentCls } from './style';
import RadioIcon from './RadioIcon';

interface CardProps {
    title?: ReactNode;
    children?: ReactNode;
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    multiple?: boolean;
}

const Card = ({
    title,
    children,
    checked,
    disabled,
    indeterminate,
    multiple,
    ...rest
}: Override<HTMLAttributes<HTMLDivElement>, CardProps>) => {
    return (
        <RadioCardWrap {...{ checked, disabled }} {...rest}>
            {title == null ? null : (
                <div className={cardHeaderCls}>
                    <span className={cardTitleCls}>{title}</span>
                    {multiple ? (
                        <CheckboxIcon disabled={disabled} checked={checked} indeterminate={indeterminate} />
                    ) : (
                        <RadioIcon disabled={disabled} checked={checked} />
                    )}
                </div>
            )}
            <div className={cardContentCls}>{children}</div>
        </RadioCardWrap>
    );
};

export default React.memo(Card);
