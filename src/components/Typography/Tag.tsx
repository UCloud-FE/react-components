import React from 'react';
import SvgIcon from 'src/components/SvgIcon';
import _ from 'lodash';

export const Tag = (props:{
    component: React.ElementType,
}) => {
    const { component: C } = props;
    const others = Object.assign({}, props, {
        component:undefined,
        theme: undefined,
        color: undefined,
        size: undefined,
        lineHeight: undefined,
        disabled: undefined,
        deleted: undefined,
        strong: undefined,
        isLink: undefined,
        isCode: undefined,
        isNum: undefined,
        transform: undefined
    });
    
    const tagProps = _.omitBy(others, (value) => value === null || value === undefined);

    return <C  {...tagProps}/>;
};
export const CopyTag = (props:any) =>{
    const others = Object.assign({}, props, { size: undefined,lineHeight:undefined });
    const spanProps = _.omitBy(others, (value) => value === null || value === undefined);
    return  <span {...spanProps} />
};
export const IconTag = React.forwardRef((props, ref:any) => {
    const others = Object.assign({}, props, { size: undefined,lineHeight:undefined });
    const tagProps = _.omitBy(others, (value) => value === null || value === undefined);

    return <SvgIcon type="copy" ref={ref} {...tagProps} />;
});