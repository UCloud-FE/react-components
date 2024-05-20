import Tooltip from 'src/components/Tooltip';
import Typography from './Text';
import React, { Component } from 'react';
import { LineEllipsisProps, TextProps } from './interface';
import { StyledTag, StyledWrapper } from './style';

/**
 * TextEllipsis.LineEllipsis
 * @description 基于容器宽度限制文本长度（仅限单行）
 */
class LineEllipsis extends Component<LineEllipsisProps & {
  typographyProps:TextProps
}, { clamped: boolean }> {
  constructor(props: LineEllipsisProps & {
    typographyProps:TextProps
  }) {
    super(props);
    this.state = {
      clamped: false,
    };
  }
  private target = React.createRef<HTMLDivElement>();
  static defaultProps: Partial<LineEllipsisProps> = {
    showTip: true,
    popoverProps: {},
    tipStyle: {},
  };
  isOverflown() {
    const node = this.target?.current;
    if (!node) return false;

    return node?.scrollWidth > node?.clientWidth;
  }

  componentDidMount() {
    this.setState({
      clamped: this.isOverflown(),
    });
  }

  componentDidUpdate(prevProps: LineEllipsisProps) {
    if (
      prevProps.containerWidth !== this.props.containerWidth ||
      prevProps.text !== this.props.text
    ) {
      this.setState({
        clamped: this.isOverflown(),
      });
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { text,tipText, showTip, popoverProps, tipStyle,typographyProps, ...others } =
      this.props;
    const { clamped } = this.state;

    const content = (
     
      <StyledWrapper  ref={this.target} {...others}>
         <StyledTag component="span" {...typographyProps}>
              {text}
          </StyledTag>
      </StyledWrapper>
    );

    if (showTip && clamped) {
      return (
        <Tooltip
          popup={
            <Typography size="sm" lineHeight='sm' component="div" style={{
              maxWidth:640,
              wordBreak: 'break-all',
              ...tipStyle
            }}>
              {tipText || text}
            </Typography>
          }
          getPopupContainer={() => document.body}
          {...popoverProps}
          arrow={false}
        >
          {content}
        </Tooltip>
      );
    }

    return content;
  }
}

export default LineEllipsis;
