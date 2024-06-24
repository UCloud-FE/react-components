import React from 'react';
import Hovertip from './Hovertip';
import SvgIcon from 'src/components/SvgIcon';
import { iconCls, StyledSpan } from './style';
import { IcontipProps, PopupAlign } from './typings';

/**
 * Hovertip.Icontip
 * @description 图标悬停提示
 */
const Icontip = ({
  icon = <SvgIcon type="question-circle" className={iconCls} />,
  placement = 'topLeft',
  ...others
}: IcontipProps): JSX.Element => {
  const alignConf: Record<string,PopupAlign> = {
    topLeft: {
      points: ['bl', 'tl'],
      overflow: { adjustX: 1, adjustY: 1 },
      offset: [-10, -10],
      targetOffset: [0, 0],
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: { adjustX: 1, adjustY: 1 },
      offset: [-10, 10],
      targetOffset: [0, 0],
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: { adjustX: 1, adjustY: 1 },
      offset: [10, -10],
      targetOffset: [0, 0],
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: { adjustX: 1, adjustY: 1 },
      offset: [10, 10],
      targetOffset: [0, 0],
    },
  };

  return (
    <Hovertip placement={placement} align={alignConf[placement]} {...others}>
      <StyledSpan>{icon}</StyledSpan>
    </Hovertip>
  );
};

export default Icontip;
