import Tooltip from 'src/components/Tooltip';
import React from 'react';
import { HovertipProps } from './typings';
/**
 * Hovertip
 * @description 鼠标移入悬停提示
 */
const Hovertip = ({
  children,
  popup,
  contentStyle = {},
  tipStyle = {},
  ...others
}: HovertipProps): JSX.Element => {
  return (
    <Tooltip
      placement="top"
      popup={
          <>{popup}</>
      }
      getPopupContainer={() => document.body}
      {...others}
    >
      <div
        style={{ display: 'inline-block', cursor: 'pointer', ...contentStyle }}
      >
        {children}
      </div>
    </Tooltip>
  );
};
export default Hovertip;
