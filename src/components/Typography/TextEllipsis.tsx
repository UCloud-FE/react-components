import Tooltip from 'src/components/Tooltip';
import { isString } from 'lodash';

import React from 'react';

import Typography from './Text';
import { TextEllipsisProps, TextProps } from './interface';
import { StyledTag } from './style';

/**
 * TextEllipsis
 * @description 限制文本展示长度
 */
const TextEllipsis = ({
  text,
  maxLength,
  ellipsis = '...',
  direction = 'fromStart',
  basedOn = 'words',
  component = 'div',
  showTip = true,
  popoverProps = {},
  tipStyle = {},
  typographyProps={},
  ...others
}: TextEllipsisProps & {
  typographyProps:TextProps
}): JSX.Element | null => {
  if (!isString(text)) {
    return null;
  }

  const Tag = component;
  let shouldShowTip = showTip;

  const getDisplayText = (
    text: string,
    maxLength: number,
    ellipsis: string,
    basedOn: 'letters' | 'words',
    direction: 'fromStart' | 'fromEnd',
  ) => {
    if (maxLength < 0) {
      shouldShowTip = false;
      return text;
    }

    if (basedOn === 'words') {
      const units = text.split(/\b|(?=\W)/);

      const result = [];
      let count = 0;
      let index = 0;
      do {
        const unit =
          direction === 'fromStart'
            ? units[index]
            : units[units.length - 1 - index];
        /* eslint-disable no-control-regex */
        if (/[^\x00-\xff]|\w/.test(unit)) count++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        direction === 'fromStart' ? result.push(unit) : result.unshift(unit);
        index++;
      } while (index < units.length && count < maxLength);

      if (count < maxLength) {
        shouldShowTip = false;
        return text;
      }

      return direction === 'fromStart'
        ? result.join('') + ellipsis
        : ellipsis + result.join('');
    }

    if (text.length <= maxLength) {
      shouldShowTip = false;
      return text;
    }

    if (maxLength - ellipsis.length <= 0) {
      return '';
    }

    return direction === 'fromStart'
      ? text.slice(0, maxLength - ellipsis.length) + ellipsis
      : ellipsis + text.slice(-maxLength + ellipsis.length);
  };

  // 根据字符自动判断basedOn
  const getBasedOn = (basedOn: 'letters' | 'words', text: string) => {
    /* eslint-disable no-control-regex */
    return basedOn || (/^[\x00-\x7F]+$/.test(text) ? 'words' : 'letters');
  };

  const content = (
    <Tag {...others}>
      {getDisplayText(
        text,
        maxLength,
        ellipsis,
        getBasedOn(basedOn, text),
        direction,
      )}
    </Tag>
  );

  if (shouldShowTip) {
    return (
      <Tooltip
        popup={
          <Typography size="sm"  lineHeight='sm' component="div" style={{
            maxWidth:540,
            wordBreak: 'break-all',
            ...tipStyle
          }}>
            {text}
          </Typography>
        }
        getPopupContainer={() => document.body}
        {...popoverProps}
        arrow={false}
      >
        <StyledTag component="span" {...typographyProps}>
        {content}
        </StyledTag>
      </Tooltip>
    );
  }

  return content;
};

TextEllipsis.defaultProps = {
  ellipsis: '...',
  direction: 'fromStart',
  component: 'div',
  showTip: true,
  popoverProps: {},
  tipStyle: {},
};

export default TextEllipsis;
