import React, { HTMLAttributes } from 'react';

import { ButtonProps } from 'src/components/Button/Button';

import { BackButtonWrap } from './style';

const BackButton = (props: ButtonProps & HTMLAttributes<HTMLButtonElement>) => {
    return <BackButtonWrap {...props} />;
};

export default BackButton;
