import React from 'react';
import { StyledContent, itemContentCompCls } from './style';
import { ContentProps } from './typings';

/**
 * ConfigInfo.Content
 * @description 配置信息项的内容展示
 */
const Content: React.FC<ContentProps> = ({
  styleType = 'primary',
  children,
  ...others
}) => {
  return (
    <StyledContent
      styleType={styleType}
      className={itemContentCompCls}
      {...others}
    >
      {children}
    </StyledContent>
  );
};
export default Content;
