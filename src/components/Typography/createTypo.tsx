/* eslint react/prop-types: 0 */
import React from 'react';
import {
  ColorLimitType,
  LimitType,
  SizeConfType,
  TextProps,
  TransformType,
} from './interface';

export default (
  Comp: React.ElementType,
  colorLimit: ColorLimitType,
  sizeConf?: SizeConfType,
  defaultTrans: TransformType = 'none',
  defaultComp: React.ElementType = 'span',
) => {
  const { limit = [], defaultColor } = colorLimit;
  let WrappedComp = null;

  if (!sizeConf || typeof sizeConf === 'boolean') {
    WrappedComp = ({ color, ...others }: { color?: string }) => {
      let _color = color as string;
      if (limit.indexOf(_color as LimitType) < 0) {
        _color = defaultColor;
      }

      return <Comp color={_color} {...others} />;
    };
  }

  // @ts-ignore
  const { sizeMap, defaultSize, enableSizeProp = true } = sizeConf || {};

  WrappedComp = ({
    color = defaultColor,
    size = defaultSize,
    transform = defaultTrans,
    component = defaultComp,
    ...others
  }: TextProps) => {
    let _color = color;
    if (limit.indexOf(_color as LimitType) < 0) {
      _color = defaultColor;
    }

    const sizeKey = enableSizeProp ? size : defaultSize;
    const mappedSize = (sizeMap && sizeKey && sizeMap[sizeKey]) || {};

    return (
      <Comp
        color={_color}
        size={mappedSize.size}
        lineHeight={mappedSize.lineHeight}
        transform={transform}
        component={component}
        {...others}
      />
    );
  };

  return WrappedComp;
};
