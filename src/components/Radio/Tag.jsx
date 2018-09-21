import React from 'react';

import Radio from './Radio';

/** @deprecated */
const Button = props => {
    console.warn('This will be deprecated, please use <Radio styleType="tag"></Radio> to instead!');
    return <Radio {...props} styleType="tag" />;
};

export default Button;
