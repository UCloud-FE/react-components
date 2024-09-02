import Tooltip from 'src/components/Tooltip';
import SvgIcon from 'src/components/SvgIcon';
import React from 'react';
import { StyledIcon } from './style';
import { ActionIconProps } from './typings';

/**
 * ConfigInfo.ActionIcon
 * @description 配置信息项的操作图标
 */
const ActionIcon: React.FC<ActionIconProps> = ({
  icon = <SvgIcon type="edit" />,
  onClick,
  popup,
  disabled,
  ...others
}) => {
  const renderIcon = () => (
    <StyledIcon
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...others}
    >
      {icon}
    </StyledIcon>
  );

  if (popup) {
    return (
      <Tooltip
        placement="top"
        // popup={<Typography size="sm">{popup}</Typography>}
        popup={popup}
        getPopupContainer={() => document.body}
      >
        {renderIcon()}
      </Tooltip>
    );
  }

  return renderIcon();
};

export default ActionIcon;
