import React from 'react';
import PropTypes from 'prop-types';

const Align = ['top', 'middle', 'bottom'];
const Justify = ['start', 'end', 'center', 'space-around', 'space-between'];
const Type = ['flex'];

import { RowWrap } from './style';

const Row = ({ gutter = 16, ...rest }) => {
    return <RowWrap gutter={gutter} {...rest} />;
};

Row.propTypes = {
    /** 是否为flex类型，flex类型时定位属性才能生效 */
    type: PropTypes.oneOf(Type),
    /** 垂直定位 */
    align: PropTypes.oneOf(Align),
    /** 水平定位 */
    justify: PropTypes.oneOf(Justify),
    /** 栅格间距 */
    gutter: PropTypes.number,
    /** @ignore */
    className: PropTypes.string,
    /** @ignore */
    style: PropTypes.object,
    /** @ignore */
    children: PropTypes.node
};

Object.assign(Row, {
    Align,
    Justify,
    Type
});

export default Row;
