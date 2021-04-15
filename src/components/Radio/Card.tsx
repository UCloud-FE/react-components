import React, { ReactNode } from 'react';

import CheckboxIcon from 'src/components/Checkbox/CheckboxIcon';

import { RadioCardWrap, cardHeaderCls, cardTitleCls, cardContentCls } from './style';
import RadioIcon from './RadioIcon';

const Card = ({
    title,
    children,
    checked,
    disabled,
    indeterminate,
    multiple,
    ...rest
}: {
    title: ReactNode;
    children: ReactNode;
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    multiple: boolean;
}) => {
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

export default Card;
